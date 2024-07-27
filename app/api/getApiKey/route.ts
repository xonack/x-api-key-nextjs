import { NextResponse } from 'next/server';
import { Rettiwt } from 'rettiwt-api';

const rettiwt = new Rettiwt();

export async function POST(request: Request) {
  const { email, username, password } = await request.json();
  
  try {
    const apiKey: string = await rettiwt.auth.login(email, username, password);
    return NextResponse.json({ apiKey });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get API key: ' + error }, { status: 500 });
  }
}