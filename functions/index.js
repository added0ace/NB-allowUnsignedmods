import { getRedirect } from "../lib/redirect.js";

export async function onRequest() {

  const url = await getRedirect();

  return Response.redirect(url, 302);
}
