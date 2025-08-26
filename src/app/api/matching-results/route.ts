import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('project_id');
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'project_id is required' },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_AZURE_API_URL;
    
    if (!apiUrl) {
      console.error('API URL not configured');
      return NextResponse.json(
        { error: 'API URLが設定されていません' },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiUrl}/matching-results?project_id=${projectId}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error:', errorText);
      return NextResponse.json(
        { error: 'マッチング結果取得エラー', details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Matching results API error:', error);
    return NextResponse.json(
      { error: 'マッチング結果取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
}