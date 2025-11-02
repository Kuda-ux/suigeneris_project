import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ApplicationConfirmationData {
  email: string;
  full_name: string;
  application_number: string;
  product_name: string;
  product_price: string;
  loan_term: string;
}

interface ApplicationStatusUpdateData {
  email: string;
  full_name: string;
  application_number: string;
  status: 'approved' | 'rejected' | 'pending' | 'under_review';
  admin_notes?: string;
}

/**
 * Send confirmation email when application is submitted
 */
export async function sendApplicationConfirmationEmail(data: ApplicationConfirmationData) {
  // Skip if Resend is not configured
  if (!resend) {
    console.warn('Resend API key not configured. Skipping confirmation email.');
    return null;
  }

  try {
    const { email, full_name, application_number, product_name, product_price, loan_term } = data;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - Sui Generis Technologies</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                Sui Generis Technologies
              </h1>
              <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 14px;">
                Zimbabwe's Premier Technology Store
              </p>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: #dcfce7; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 40px;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; text-align: center;">
                Application Received Successfully!
              </h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${full_name}</strong>,
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for applying for our Civil Servants Laptop Financing program! We have successfully received your application and our team will review it within <strong>48 hours</strong>.
              </p>

              <!-- Application Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">
                      Application Details
                    </h3>
                    
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                          Application Number:
                        </td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold; text-align: right; border-bottom: 1px solid #e5e7eb;">
                          ${application_number}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                          Product:
                        </td>
                        <td style="color: #1f2937; font-size: 14px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                          ${product_name}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                          Price:
                        </td>
                        <td style="color: #1f2937; font-size: 14px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                          $${product_price}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">
                          Payment Term:
                        </td>
                        <td style="color: #1f2937; font-size: 14px; text-align: right;">
                          ${loan_term} months
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">
                  📋 Next Steps:
                </h4>
                <ol style="color: #1e3a8a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                  <li>Our team will review your application within 48 hours</li>
                  <li>We may contact you for additional information if needed</li>
                  <li>You'll receive an email notification once your application is approved</li>
                  <li>Approved laptops will be delivered within 5 working days</li>
                </ol>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                If you have any questions, please don't hesitate to contact us.
              </p>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    <h4 style="color: #1f2937; margin: 0 0 15px 0; font-size: 16px;">
                      Contact Us
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="5" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; text-align: center;">
                          📞 <strong>Phone:</strong> +263 78 411 6938
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; text-align: center;">
                          📧 <strong>Email:</strong> info@suigeneriszim.co.zw
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; text-align: center;">
                          📍 <strong>Address:</strong> 109 Leopold Takawira St, Harare
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; text-align: center;">
                          🌐 <strong>Website:</strong> <a href="https://www.suigeneriszim.co.zw" style="color: #dc2626; text-decoration: none;">www.suigeneriszim.co.zw</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 20px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Sui Generis Technologies Zimbabwe. All rights reserved.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
                This is an automated message. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data: result, error } = await resend.emails.send({
      from: 'Sui Generis Technologies <noreply@suigeneriszim.co.zw>',
      to: [email],
      subject: `Application Received - ${application_number}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }

    console.log('Confirmation email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw error;
  }
}

/**
 * Send email when application status is updated
 */
export async function sendApplicationStatusUpdateEmail(data: ApplicationStatusUpdateData) {
  // Skip if Resend is not configured
  if (!resend) {
    console.warn('Resend API key not configured. Skipping status update email.');
    return null;
  }

  try {
    const { email, full_name, application_number, status, admin_notes } = data;

    let statusColor = '#3b82f6';
    let statusText = 'Under Review';
    let statusIcon = '🔍';
    let message = 'Your application is currently under review.';

    if (status === 'approved') {
      statusColor = '#10b981';
      statusText = 'Approved';
      statusIcon = '✅';
      message = 'Congratulations! Your loan application has been approved. We will contact you shortly to arrange delivery.';
    } else if (status === 'rejected') {
      statusColor = '#ef4444';
      statusText = 'Not Approved';
      statusIcon = '❌';
      message = 'Unfortunately, your application was not approved at this time. Please contact us for more information.';
    } else if (status === 'under_review') {
      statusColor = '#f59e0b';
      statusText = 'Under Review';
      statusIcon = '🔍';
      message = 'Your application is currently under review. We may contact you for additional information.';
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Status Update - Sui Generis Technologies</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                Sui Generis Technologies
              </h1>
              <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 14px;">
                Application Status Update
              </p>
            </td>
          </tr>

          <!-- Status Badge -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <div style="display: inline-block; background-color: ${statusColor}; color: white; padding: 12px 30px; border-radius: 25px; font-size: 18px; font-weight: bold;">
                ${statusIcon} ${statusText}
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${full_name}</strong>,
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                ${message}
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">
                          Application Number:
                        </td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold; text-align: right;">
                          ${application_number}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">
                          Status:
                        </td>
                        <td style="color: ${statusColor}; font-size: 14px; font-weight: bold; text-align: right;">
                          ${statusText}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${admin_notes ? `
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">
                  📝 Additional Notes:
                </h4>
                <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 1.6;">
                  ${admin_notes}
                </p>
              </div>
              ` : ''}

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                If you have any questions, please contact us at +263 78 411 6938 or visit our store.
              </p>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    <h4 style="color: #1f2937; margin: 0 0 15px 0; font-size: 16px;">
                      Contact Us
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="5" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; text-align: center;">
                          📞 +263 78 411 6938 | 📧 info@suigeneriszim.co.zw
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; text-align: center;">
                          📍 109 Leopold Takawira St, Harare, Zimbabwe
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 20px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Sui Generis Technologies Zimbabwe. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data: result, error } = await resend.emails.send({
      from: 'Sui Generis Technologies <noreply@suigeneriszim.co.zw>',
      to: [email],
      subject: `Application ${statusText} - ${application_number}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending status update email:', error);
      throw error;
    }

    console.log('Status update email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send status update email:', error);
    throw error;
  }
}

/**
 * Send notification to admin when new application is submitted
 */
export async function sendAdminNotificationEmail(data: ApplicationConfirmationData) {
  // Skip if Resend is not configured
  if (!resend) {
    console.warn('Resend API key not configured. Skipping admin notification email.');
    return null;
  }

  try {
    const { full_name, application_number, product_name, product_price, email, loan_term } = data;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Loan Application - Admin Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px;">
    <h2 style="color: #dc2626; margin-top: 0;">🔔 New Loan Application Received</h2>
    
    <p style="color: #4b5563; font-size: 16px;">
      A new civil servant loan application has been submitted and requires review.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Application Number:</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${application_number}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Applicant Name:</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${full_name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email:</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Product:</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${product_name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Price:</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">$${product_price}</td>
      </tr>
      <tr>
        <td style="padding: 10px; color: #6b7280;">Loan Term:</td>
        <td style="padding: 10px;">${loan_term} months</td>
      </tr>
    </table>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e;">
        ⏰ <strong>Action Required:</strong> Please review this application within 48 hours.
      </p>
    </div>

    <a href="https://www.suigeneriszim.co.zw/admin/dashboard" 
       style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px;">
      Review Application
    </a>

    <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
      This is an automated notification from Sui Generis Technologies loan application system.
    </p>
  </div>
</body>
</html>
    `;

    const { data: result, error } = await resend.emails.send({
      from: 'Sui Generis System <system@suigeneriszim.co.zw>',
      to: ['info@suigeneriszim.co.zw'], // Admin email
      subject: `🔔 New Loan Application - ${application_number}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending admin notification:', error);
      throw error;
    }

    console.log('Admin notification sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
  }
}
