// app/api/upload/route.js

import envCfg from '@/config/env';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest } from 'next/server';
import generateRandomString from '@/utils/common-functions/generateRandomString';


const FILE_SERVER_URL = envCfg.filebase_FILE_SERVER_URL;
const FILEBASE_BUCKET = envCfg.filebase_FILEBASE_BUCKET;
const FILEBASE_REGION = envCfg.filebase_FILEBASE_REGION;
const FILEBASE_ACCESS_KEY = envCfg.filebase_FILEBASE_ACCESS_KEY as string;
const FILEBASE_SECRET_KEY = envCfg.filebase_FILEBASE_SECRET_KEY as string;

// Set up AWS S3 client (Filebase in this case)
const s3 = new S3Client({
  endpoint: 'https://s3.filebase.com',
  region: FILEBASE_REGION,
  credentials: {
    accessKeyId: FILEBASE_ACCESS_KEY,
    secretAccessKey: FILEBASE_SECRET_KEY,
  },
});

// API route handler
export async function POST(request: NextRequest) {
  try {
    // Extract form data from the request
    const data = await request.formData();
    const file = data.get('file') as unknown as File; // Access the uploaded file

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const fileName = new Date().getTime().toString() + generateRandomString(10);
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Upload to Filebase (S3-compatible storage)
    const command = new PutObjectCommand({
        Bucket: FILEBASE_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
    });
    await s3.send(command);

    // Retrieve metadata (e.g., IPFS CID if available)
    const commandGetObject = new GetObjectCommand({
        Bucket: FILEBASE_BUCKET,
        Key: fileName,
    });
    const response = await s3.send(commandGetObject);

    // Return the file URL (IPFS CID, if available)
    const responseData = {
        file: fileName,
        url: `${fileName}_${response.Metadata?.cid}` || '',
    };

    return Response.json(responseData, { status: 200 });
    
  } catch (error) {
    console.error('Error processing upload:', error);
    return Response.json('Error processing upload', { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
    try {
      // Extract the filename from the URL (or request body)
      const url = new URL(request.url);
      const fileName = url.searchParams.get('file');
  
      if (!fileName) {
        return new Response('File name is required', { status: 400 });
      }
  
      // Delete the file from Filebase (S3-compatible storage)
      const command = new DeleteObjectCommand({
        Bucket: FILEBASE_BUCKET,
        Key: fileName,
      });
  
      await s3.send(command);
  
      return new Response('File deleted successfully', { status: 200 });
    } catch (error) {
      console.error('Error deleting file:', error);
      return new Response('Error deleting file', { status: 500 });
    }
}
