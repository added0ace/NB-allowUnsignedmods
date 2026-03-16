async function redirect() {
  try {
    const r = await fetch("https://dnull.xyz/latest_bs", {
      redirect: "follow"
    });

    const fileName = new URL(r.url).pathname.split("/").pop();

    const target =
      "https://tempweb.nullsusercontent.com/fpapk/" +
      fileName +
      "?allowUnsignedMods=1";

    window.location.replace(target);

  } catch (e) {
    document.body.innerText = "Error: " + e;
  }
}

redirect();
