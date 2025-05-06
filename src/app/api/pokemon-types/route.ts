// app/api/pokemon/route.ts
import { NextResponse } from 'next/server';

import axiosInstance from '@/lib/api';

export async function GET() {
  try {
    const response = await axiosInstance.get('type');
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Pokemon types' },
      { status: 500 },
    );
  }
}
