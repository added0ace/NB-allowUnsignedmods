const HOSTS = [
  "https://tempweb.nullsusercontent.com",
  "https://anticensorship.nullsusercontent.com"
];

const DEFAULT_FILE = "nb_68.279_release_7c5c5152.apk";

async function ping(url, timeoutMs = 2500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = performance.now();

  try {
    const opts = { method: 'HEAD', signal: controller.signal };
    if (typeof window !== 'undefined') opts.mode = 'no-cors';

    await fetch(url, opts);
    return performance.now() - start;
  } catch {
    return Infinity;
  } finally {
    clearTimeout(timer);
  }
}

async function getFileName() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://dnull.xyz/latest_bs", { redirect: "follow", signal: controller.signal });
    clearTimeout(timer);
    const filename = new URL(res.url).pathname.split("/").pop();
    if (filename && filename.endsWith(".apk")) return filename;
  } catch {}

  try {
    const res = await fetch("./version.json");
    const data = await res.json();
    if (data.file) return data.file;
  } catch {}

  return DEFAULT_FILE;
}

export async function getRedirect() {
  const [pings, fileName] = await Promise.all([
    Promise.all(HOSTS.map(host => ping(host))),
    getFileName()
  ]);

  const [ping1, ping2] = pings;
  let bestHost = HOSTS[0];

  if (ping1 === Infinity && ping2 === Infinity) {
    bestHost = HOSTS[0];
  } else if (ping2 < ping1) {
    bestHost = HOSTS[1];
  }

  const basePath = bestHost.includes("tempweb") ? `${bestHost}/fpapk` : bestHost;
  return `${basePath}/${fileName}?allowUnsignedMods=1`;
}
