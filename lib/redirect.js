async function p(u) {
  const t = performance.now();
  try {
    await fetch(u, { method: 'HEAD', mode: 'no-cors' });
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
  const r = await Promise.all(h.map(x => p(x)));
  const f = r[0] <= r[1] ? h[0] : h[1];
  const o = f === Infinity ? h[0] : f;
  let s = "";
  try {
    const d = await fetch("https://dnull.xyz/latest_bs", { redirect: "follow" });
    s = new URL(d.url).pathname.split("/").pop();
  } catch (e) {
    try {
      const g = await fetch("./version.json");
      const j = await g.json();
      s = j.file;
    } catch (ex) {
      s = "nb_67.264_release_863546cb.apk";
    }
  }
  return o.includes("tempweb") ? `${o}/fpapk/${s}?allowUnsignedMods=1` : `${o}/${s}?allowUnsignedMods=1`;
}
