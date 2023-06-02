import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ status: 'Ok' }, { status: 200 });
}
