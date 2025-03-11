import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the resume PDF in the public folder
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf');
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="2025_DavidLarrimore_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error serving resume PDF:', error);
    return new NextResponse('Error serving the resume PDF', { status: 500 });
  }
}