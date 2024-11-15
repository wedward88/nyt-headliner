import { NextResponse } from 'next/server';

const apiURL = process.env.NYT_URL;
const apiKey = process.env.NYT_API_KEY;

export async function POST(request: Request) {
  try {
    const { date } = await request.json();

    let url = `${apiURL}?fq=pub_date:${date}&api-key=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
