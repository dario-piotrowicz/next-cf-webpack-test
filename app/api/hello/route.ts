
// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import type { NextRequest } from 'next/server';

// @ts-ignore
import getRequestContext from 'cloudflare:request-context';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const [ _req, env, _ctx ] = getRequestContext();
  const myKv = env.MY_KV;
  return new Response(`myKey: ${myKv.get('myKey')}`);
}
