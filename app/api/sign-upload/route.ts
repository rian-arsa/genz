// pages/api/sign-upload.js
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
    process.env.CLOUDINARY_API_SECRET as string
  );

  console.log('Generated signature:', signature, cloudinary.config());

  return NextResponse.json({
    timestamp,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
}
