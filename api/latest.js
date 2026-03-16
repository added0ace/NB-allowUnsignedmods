export default async function handler(req, res) {

  const r = await fetch("https://dnull.xyz/latest_bs", {
    redirect: "follow"
  });

  const fileName = new URL(r.url).pathname.split("/").pop();

  const target =
    "https://tempweb.nullsusercontent.com/fpapk/" +
    fileName +
    "?allowUnsignedMods=1";

  res.writeHead(302, {
    Location: target
  });

  res.end();
}
