import { NextResponse } from 'next/server';

const API_URL = 'https://relay.flashbots.net';

export async function POST(request: Request) {
  const { address } = await request.json();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'flashbots_getFeeRefundTotalsBySender',
      params: [address],
    }),
  });

  const data = await response.json();

  return NextResponse.json(data.result);
}