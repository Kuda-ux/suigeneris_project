import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Target email for all form submissions
const TARGET_EMAIL = 'info@suigeneriszim.co.zw';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@suigeneriszim.co.zw';

interface ContactFormData {
    type: 'contact' | 'consultation';
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    // IT Consultation specific fields
    companyName?: string;
    serviceInterest?: string;
    budgetRange?: string;
    timeline?: string;
    projectDescription?: string;
}

export async function POST(request: Request) {
    try {
        const data: ContactFormData = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Build email content based on form type
        let emailSubject: string;
        let emailHtml: string;

        if (data.type === 'consultation') {
            emailSubject = `🚀 New IT Consultation Request from ${data.companyName || data.name}`;
            emailHtml = generateConsultationEmail(data);
        } else {
            emailSubject = `📧 New Contact Form Submission: ${data.subject || 'General Inquiry'}`;
            emailHtml = generateContactEmail(data);
        }

        // If Resend is not configured, log and return success (for development)
        if (!resend) {
            console.log('📧 Email would be sent to:', TARGET_EMAIL);
            console.log('Subject:', emailSubject);
            console.log('From:', data.email);
            console.log('Data:', JSON.stringify(data, null, 2));

            return NextResponse.json({
                success: true,
                message: 'Form submitted successfully (email service not configured in development)',
                data: { id: 'dev-' + Date.now() }
            });
        }

        // Send email via Resend
        const { data: result, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [TARGET_EMAIL],
            replyTo: data.email,
            subject: emailSubject,
            html: emailHtml,
        });

        if (error) {
            console.error('❌ Email send error:', error);
            return NextResponse.json(
                { error: 'Failed to send email. Please try again.' },
                { status: 500 }
            );
        }

        console.log('✅ Email sent successfully:', result);

        // Send auto-reply to customer
        await sendAutoReply(data);

        return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully!',
            data: result
        });

    } catch (error: any) {
        console.error('❌ Contact form error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}

function generateContactEmail(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">📧 New Contact Submission</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Sui Generis Technologies</p>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
      <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #991b1b; font-weight: 600;">New message received from your website contact form</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600; width: 140px;">Name:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.email}</a></td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Phone:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.phone}</a></td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Subject:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${data.subject || 'General Inquiry'}</td>
        </tr>
      </table>

      <div style="margin-top: 25px;">
        <h3 style="color: #374151; margin: 0 0 10px; font-size: 16px;">Message:</h3>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
          <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>

      <div style="margin-top: 25px; text-align: center;">
        <a href="mailto:${data.email}?subject=Re: ${data.subject || 'Your Inquiry'}" 
           style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700;">
          Reply to ${data.name}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 12px;">
        This email was sent from the contact form on <strong>suigeneriszim.co.zw</strong>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateConsultationEmail(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New IT Consultation Request</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">🚀 New IT Consultation Request</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">High-Value Lead from IT Solutions Page</p>
    </div>

    <!-- Priority Badge -->
    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 15px; text-align: center;">
      <span style="color: #78350f; font-weight: 800; font-size: 14px;">⭐ PRIORITY LEAD - IT SERVICES ⭐</span>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600; width: 140px;">Company:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700; font-size: 16px;">${data.companyName || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Contact Person:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${data.email}</a></td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Phone:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${data.phone}</a></td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Service Interest:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="background-color: #ede9fe; color: #5b21b6; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 14px;">${data.serviceInterest || 'General IT Services'}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Budget Range:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 14px;">${data.budgetRange || 'To be discussed'}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Timeline:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${data.timeline || 'Flexible'}</td>
        </tr>
      </table>

      <div style="margin-top: 25px;">
        <h3 style="color: #374151; margin: 0 0 10px; font-size: 16px;">Project Description:</h3>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
          <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.projectDescription || data.message}</p>
        </div>
      </div>

      <div style="margin-top: 25px; background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #92400e; font-weight: 600;">
          ⏰ <strong>Action Required:</strong> Respond within 24 hours for best conversion
        </p>
      </div>

      <div style="margin-top: 25px; text-align: center;">
        <a href="mailto:${data.email}?subject=Re: IT Consultation Request - ${data.companyName || 'Your Project'}" 
           style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; margin-right: 10px;">
          📧 Reply by Email
        </a>
        ${data.phone ? `
        <a href="tel:${data.phone}" 
           style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700;">
          📞 Call Now
        </a>
        ` : ''}
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 12px;">
        This is a high-value lead from the <strong>IT Solutions</strong> page on <strong>suigeneriszim.co.zw</strong>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

async function sendAutoReply(data: ContactFormData): Promise<void> {
    if (!resend) return;

    const autoReplyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Contacting Us</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Thank You!</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">We've received your message</p>
    </div>

    <div style="padding: 30px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${data.name},</p>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Thank you for contacting <strong>Sui Generis Technologies</strong>. We've received your ${data.type === 'consultation' ? 'consultation request' : 'message'} and our team will get back to you within <strong>24 hours</strong>.
      </p>

      ${data.type === 'consultation' ? `
      <div style="background-color: #ede9fe; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <p style="margin: 0; color: #5b21b6; font-weight: 600;">
          🚀 As an IT consultation inquiry, your request has been flagged as priority and will be handled by our senior team.
        </p>
      </div>
      ` : ''}

      <p style="color: #374151; font-size: 16px; line-height: 1.6;">In the meantime, feel free to:</p>
      <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
        <li>Browse our <a href="https://www.suigeneriszim.co.zw/products" style="color: #dc2626;">product catalog</a></li>
        <li>Explore our <a href="https://www.suigeneriszim.co.zw/it-solutions" style="color: #dc2626;">IT solutions</a></li>
        <li>Call us directly at <a href="tel:+263784116938" style="color: #dc2626;">+263 78 411 6938</a></li>
      </ul>

      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Best regards,<br>
        <strong>The Sui Generis Team</strong>
      </p>
    </div>

    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0 0 10px; color: #374151; font-weight: 600;">Sui Generis Technologies</p>
      <p style="margin: 0; color: #6b7280; font-size: 12px;">
        📍 109 Leopold Takawira St, Harare | 📞 +263 78 411 6938 | 📧 info@suigeneriszim.co.zw
      </p>
    </div>
  </div>
</body>
</html>
  `;

    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to: [data.email],
            subject: data.type === 'consultation'
                ? '🚀 Your IT Consultation Request - Sui Generis Technologies'
                : '✅ We received your message - Sui Generis Technologies',
            html: autoReplyHtml,
        });
    } catch (error) {
        console.error('Failed to send auto-reply:', error);
    }
}
