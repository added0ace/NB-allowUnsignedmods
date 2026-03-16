export async function getRedirect() {

  const r = await fetch("https://dnull.xyz/latest_bs", {
    redirect: "follow"
  });

  const fileName = new URL(r.url).pathname.split("/").pop();

  return "https://tempweb.nullsusercontent.com/fpapk/" +
    fileName +
    "?allowUnsignedMods=1";
}
