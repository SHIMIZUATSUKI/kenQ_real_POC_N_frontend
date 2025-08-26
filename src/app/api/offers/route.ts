import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const apiUrl = process.env.API_URL;
    
    if (!apiUrl) {
      console.error('API URL not configured');
      return NextResponse.json(
        { error: 'API URLが設定されていません' },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiUrl}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error:', errorText);
      return NextResponse.json(
        { error: 'オファー送信エラー', details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Offers API error:', error);
    return NextResponse.json(
      { error: 'オファー送信中にエラーが発生しました' },
      { status: 500 }
    );
  }
}