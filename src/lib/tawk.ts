export function tawkScriptInit() {
  let Tawk_API = {};
  let Tawk_LoadStart = new Date();

  if (typeof window !== "undefined") {
    (function () {
      const body = document.getElementsByTagName("body")[0];

      const tawkScript = document.createElement("script");

      tawkScript.async = true;
      tawkScript.type = "text/javascript";
      tawkScript.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}/1f67n1bk7`;
      tawkScript.setAttribute("crossorigin", "*");
      body.appendChild(tawkScript);
    })();
  }
}
