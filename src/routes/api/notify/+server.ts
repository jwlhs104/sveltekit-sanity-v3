import { json } from "@sveltejs/kit"
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (request) => {
  console.log(request)
  return json({
    body: "ok"
  })
};

