async function p(url) {
  const t = performance.now();
  try {
    await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    return performance.now() - t;
  } catch (e) {
    return Infinity;
  }
}

export async function getRedirect() {
  const h = [
    "https://tempweb.nullsusercontent.com",
    "https://anticensorship.nullsusercontent.com"
  ];

  const res = await Promise.all(h.map(x => p(x)));
  const fast = res[0] <= res[1] ? h[0] : h[1];
  const host = fast === Infinity ? h[0] : fast;

  try {
    const r = await fetch(`${host}/latest_bs`, { redirect: "follow" });
    const file = new URL(r.url).pathname.split("/").pop();

    return host.includes("tempweb") 
      ? `${host}/fpapk/${file}?allowUnsignedMods=1`
      : `${host}/${file}?allowUnsignedMods=1`;
  } catch (e) {
    const r = await fetch("https://dnull.xyz/latest_bs", { redirect: "follow" });
    const file = new URL(r.url).pathname.split("/").pop();
    return host.includes("tempweb") 
      ? `${host}/fpapk/${file}?allowUnsignedMods=1`
      : `${host}/${file}?allowUnsignedMods=1`;
  }
}
