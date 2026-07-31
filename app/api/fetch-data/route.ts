import { NextResponse } from 'next/server';

const apiURL = process.env.NYT_URL?.replace(/^['"]|['"]$/g, '');
const apiKey = process.env.NYT_API_KEY?.replace(/^['"]|['"]$/g, '');

export async function POST(request: Request) {
  try {
    if (!apiURL || !apiKey) {
      return NextResponse.json(
        { error: 'NYT API is not configured on the server' },
        { status: 500 }
      );
    }

    const { date } = await request.json();

    if (!date || typeof date !== 'string') {
      return NextResponse.json({ error: 'date is required' }, { status: 400 });
    }

    // Prefer quoted date filter; fall back to unquoted if NYT rejects the query.
    const urls = [
      `${apiURL}?fq=pub_date:("${date}")&api-key=${apiKey}`,
      `${apiURL}?fq=pub_date:${date}&api-key=${apiKey}`,
      `${apiURL}?begin_date=${date.replace(/-/g, '')}&end_date=${date.replace(/-/g, '')}&api-key=${apiKey}`,
    ];

    let lastData: unknown = null;
    let lastStatus = 500;

    for (const url of urls) {
      const response = await fetch(url, { cache: 'no-store' });
      const data = await response.json();

      lastData = data;
      lastStatus = response.status;

      if (response.ok && Array.isArray(data?.response?.docs)) {
        return NextResponse.json(data);
      }
    }

    return NextResponse.json(lastData ?? { error: 'NYT request failed' }, {
      status: lastStatus,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
