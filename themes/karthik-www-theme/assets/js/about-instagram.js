(() => {
  "use strict";

  const embed = document.querySelector("[data-instagram-embed]");
  const status = document.querySelector("[data-instagram-status]");
  if (!embed || !status) return;

  const observer = new MutationObserver(() => {
    if (embed.querySelector("iframe")) {
      status.hidden = true;
      observer.disconnect();
      clearTimeout(timeout);
    }
  });
  observer.observe(embed, { childList: true, subtree: true });

  const fail = () => {
    clearTimeout(timeout);
    observer.disconnect();
    embed.hidden = true;
    status.textContent = "Preview unavailable. Use the profile link instead.";
  };
  const timeout = setTimeout(fail, 12000);
  const render = () => {
    if (!window.instgrm?.Embeds?.process) return fail();
    try { window.instgrm.Embeds.process(); } catch { fail(); }
  };

  if (window.instgrm?.Embeds?.process) {
    render();
  } else {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = render;
    script.onerror = fail;
    document.head.append(script);
  }
})();
