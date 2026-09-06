import { getRedirect } from "./lib/redirect.js";

async function go() {
  try {
    const url = await getRedirect();
    window.location.replace(url);
  } catch (err) {
    document.body.innerText = "Error: " + err;
  }
}

go();
