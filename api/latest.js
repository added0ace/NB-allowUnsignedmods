import { getRedirect } from "../lib/redirect.js";
export default async function (q, s) {
  const u = await getRedirect();
  s.writeHead(302, { Location: u });
  s.end();
}
