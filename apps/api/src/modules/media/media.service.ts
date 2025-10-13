import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class MediaService {
  private minioClient: Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get('S3_ENDPOINT', 'localhost').replace('http://', '').replace('https://', ''),
      port: parseInt(this.configService.get('S3_PORT', '9000')),
      useSSL: this.configService.get('S3_USE_SSL', 'false') === 'true',
      accessKey: this.configService.get('S3_ACCESS_KEY'),
      secretKey: this.configService.get('S3_SECRET_KEY'),
    });

    this.bucketName = this.configService.get('S3_BUCKET', 'suigeneris-store');
    this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
        
        // Set bucket policy for public read access to images
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${this.bucketName}/images/*`],
            },
          ],
        };
        
        await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
      }
    } catch (error) {
      console.error('Error ensuring bucket exists:', error);
    }
  }

  async uploadFile(file: Express.Multer.File, folder = 'images'): Promise<{
    url: string;
    key: string;
    size: number;
    mimeType: string;
  }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `${crypto.randomUUID()}${fileExtension}`;
    const key = `${folder}/${fileName}`;

    try {
      // Upload to MinIO
      await this.minioClient.putObject(
        this.bucketName,
        key,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
          'Cache-Control': 'max-age=31536000', // 1 year
        }
      );

      // Generate public URL
      const baseUrl = this.configService.get('S3_ENDPOINT', 'http://localhost:9000');
      const url = `${baseUrl}/${this.bucketName}/${key}`;

      return {
        url,
        key,
        size: file.size,
        mimeType: file.mimetype,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }

  async uploadMultipleFiles(files: Express.Multer.File[], folder = 'images') {
    const uploadPromises = files.map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  async deleteFile(key: string): Promise<void> {
    try {
      await this.minioClient.removeObject(this.bucketName, key);
    } catch (error) {
      throw new BadRequestException(`Failed to delete file: ${error.message}`);
    }
  }

  async getFileUrl(key: string): Promise<string> {
    try {
      return await this.minioClient.presignedGetObject(this.bucketName, key, 24 * 60 * 60); // 24 hours
    } catch (error) {
      throw new BadRequestException(`Failed to get file URL: ${error.message}`);
    }
  }

  async getFileInfo(key: string) {
    try {
      const stat = await this.minioClient.statObject(this.bucketName, key);
      return {
        size: stat.size,
        lastModified: stat.lastModified,
        etag: stat.etag,
        contentType: stat.metaData['content-type'],
      };
    } catch (error) {
      throw new BadRequestException(`Failed to get file info: ${error.message}`);
    }
  }

  generateThumbnailKey(originalKey: string, size: string): string {
    const ext = path.extname(originalKey);
    const nameWithoutExt = originalKey.replace(ext, '');
    return `${nameWithoutExt}_${size}${ext}`;
  }

  isImageFile(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  isVideoFile(mimeType: string): boolean {
    return mimeType.startsWith('video/');
  }
}
