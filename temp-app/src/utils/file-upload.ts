import { supabase } from '@/lib/supabase';

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate file type and size
 */
export function validateFile(file: File): FileValidationResult {
  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only PDF, JPG, and PNG files are allowed.',
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit.',
    };
  }

  return { valid: true };
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  applicationId: string,
  documentType: string
): Promise<{ url: string; path: string } | null> {
  try {
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Generate unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}/${documentType}_${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('loan-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('loan-documents')
      .getPublicUrl(fileName);

    return {
      url: urlData.publicUrl,
      path: fileName,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Upload multiple documents for a loan application
 */
export async function uploadLoanDocuments(
  files: {
    national_id?: File | null;
    payslip?: File | null;
    proof_of_residence?: File | null;
  },
  applicationId: string
): Promise<{
  national_id_document_url?: string;
  payslip_document_url?: string;
  proof_of_residence_document_url?: string;
}> {
  const urls: any = {};

  try {
    // Upload national ID
    if (files.national_id) {
      const result = await uploadFile(files.national_id, applicationId, 'national_id');
      if (result) urls.national_id_document_url = result.url;
    }

    // Upload payslip
    if (files.payslip) {
      const result = await uploadFile(files.payslip, applicationId, 'payslip');
      if (result) urls.payslip_document_url = result.url;
    }

    // Upload proof of residence
    if (files.proof_of_residence) {
      const result = await uploadFile(files.proof_of_residence, applicationId, 'proof_of_residence');
      if (result) urls.proof_of_residence_document_url = result.url;
    }

    return urls;
  } catch (error) {
    console.error('Error uploading loan documents:', error);
    throw error;
  }
}

/**
 * Download file from Supabase Storage
 */
export async function downloadFile(filePath: string, fileName: string): Promise<void> {
  try {
    const { data, error } = await supabase.storage
      .from('loan-documents')
      .download(filePath);

    if (error) {
      throw error;
    }

    // Create blob URL and trigger download
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

/**
 * Get file extension from URL
 */
export function getFileExtension(url: string): string {
  const parts = url.split('.');
  return parts[parts.length - 1].split('?')[0];
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
