import { getRedirect } from "../lib/redirect.js";

export default async function handler(req, res) {

  const url = await getRedirect();

  res.writeHead(302, {
    Location: url
  });

  res.end();
}
