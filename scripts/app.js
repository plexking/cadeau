// App: screen router + all interactive behavior.
// Plain JS, no build step, just open index.html.

(function () {
  "use strict";

  /* Screen router */

  function showScreen(name) {
    document.querySelectorAll(".screen").forEach((el) => {
      el.classList.remove("screen--active");
    });
    const target = document.getElementById("screen-" + name);
    if (target) {
      // force reflow so the transition replays
      void target.offsetWidth;
      target.classList.add("screen--active");
    }
    if (name === "music") {
      loadVideoIfNeeded();
    } else {
      unloadVideo();
    }
  }

  document.querySelectorAll("[data-next]").forEach((el) => {
    el.addEventListener("click", () => showScreen(el.dataset.next));
  });

  /* Floating hearts (ambient) */

  const heartsLayer = document.getElementById("floating-hearts");
  const heartSymbols = ["♥", "❤", "💕"];

  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.setProperty("--drift", (Math.random() * 40 - 20) + "px");
    const duration = 5 + Math.random() * 3;
    heart.style.animationDuration = duration + "s";
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 200);
  }

  setInterval(spawnHeart, 1400);

  /* Screen 1: Love question */

  const questionHeading = document.getElementById("question-heading");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");

  let noClicks = 0;

  const escalation = [
    { heading: siteConfig.question, yesScale: 1, noScale: 1 },
    { heading: "nah that's not right...", yesScale: 1.25, noScale: 0.75 },
    { heading: "be serious...", yesScale: 1.7, noScale: 0.5 },
    { heading: "be serious...", yesScale: 2.2, noScale: 0.3 },
    { heading: "be serious...", yesScale: 2.9, noScale: 0, vanish: true }
  ];

  function applyEscalation() {
    const step = escalation[Math.min(noClicks, escalation.length - 1)];
    questionHeading.textContent = step.heading;
    btnYes.style.transform = `scale(${step.yesScale})`;

    if (step.vanish) {
      // NO collapses out of the layout entirely so YES re-centers itself
      btnNo.classList.add("btn--vanished");
      btnNo.setAttribute("aria-hidden", "true");
      btnNo.tabIndex = -1;
      document.querySelector(".button-row").classList.add("button-row--solo");
    } else {
      btnNo.style.transform = `scale(${step.noScale})`;
      // nudge the NO button around a little once things get silly,
      // but always keep it reachable
      if (noClicks >= 2) {
        const dx = (Math.random() * 60 - 30).toFixed(0);
        const dy = (Math.random() * 20 - 10).toFixed(0);
        btnNo.style.translate = `${dx}px ${dy}px`;
      }
    }
  }

  btnNo.addEventListener("click", () => {
    noClicks += 1;
    applyEscalation();
  });

  btnYes.addEventListener("click", () => {
    showScreen("celebration");
  });

  /* Gift 1: Memories scrapbook */

  document.getElementById("gift1-title").textContent = siteConfig.giftOneTitle;

  const memoriesGrid = document.getElementById("memories-grid");

  function renderMemories() {
    memoriesGrid.innerHTML = "";
    memories.forEach((m) => {
      const wrap = document.createElement("div");
      wrap.className = `polaroid polaroid--${m.position}`;
      wrap.style.transform = `rotate(${m.rotation}deg)`;

      const img = document.createElement("img");
      img.src = m.src;
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("click", () => openLightbox(m.src));
      wrap.appendChild(img);
      memoriesGrid.appendChild(wrap);
    });

    // a few sparkle doodles
    for (let i = 0; i < 5; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = "✦";
      s.style.top = Math.random() * 90 + "%";
      s.style.left = Math.random() * 90 + "%";
      s.style.animationDelay = (i * 0.7) + "s";
      memoriesGrid.appendChild(s);
    }
  }
  renderMemories();

  /* Lightbox (full-size photo view) */

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLightbox);

  // click outside the image (on the dark backdrop) also closes it
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* Gift selection screen */

  const giftRow = document.getElementById("gift-row");

  function giftIconSvg(idSuffix) {
    // Unique gradient/shadow ids per card so multiple instances don't clash
    const gradId = `giftBoxGrad-${idSuffix}`;
    const lidGradId = `giftLidGrad-${idSuffix}`;
    const shadowId = `giftShadow-${idSuffix}`;
    return `
      <svg class="gift-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="10" y1="26" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FBD4E1"/>
            <stop offset="100%" stop-color="#F4A6B9"/>
          </linearGradient>
          <linearGradient id="${lidGradId}" x1="6" y1="18" x2="58" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#F7C6D6"/>
            <stop offset="100%" stop-color="#EFA9C4"/>
          </linearGradient>
          <filter id="${shadowId}" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#B84F70" flood-opacity="0.28"/>
          </filter>
        </defs>

        <g filter="url(#${shadowId})">
          <rect x="10" y="27" width="44" height="29" rx="4" fill="url(#${gradId})" stroke="#B84F70" stroke-width="2"/>
          <rect x="10" y="27" width="44" height="9" fill="#ffffff" opacity="0.35"/>
          <rect x="6" y="17" width="52" height="11" rx="3" fill="url(#${lidGradId})" stroke="#B84F70" stroke-width="2"/>
          <rect x="29" y="17" width="6" height="39" fill="#ffffff" opacity="0.55"/>
          <rect x="29" y="17" width="6" height="39" stroke="#B84F70" stroke-width="1.4"/>
          <path d="M32 17C32 17 22 4 13 8C4 12 18 17 32 17Z" fill="#F7C6D6" stroke="#B84F70" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M32 17C32 17 42 4 51 8C60 12 46 17 32 17Z" fill="#F7C6D6" stroke="#B84F70" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M32 34 L34.4 39 L40 40 L35.8 43.6 L37 49 L32 46.2 L27 49 L28.2 43.6 L24 40 L29.6 39 Z" fill="#B84F70" opacity="0.85"/>
        </g>
      </svg>`;
  }

  siteConfig.gifts.forEach((gift, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "gift-card";
    card.innerHTML = `${giftIconSvg(gift.id)}<span class="gift-card__label">${gift.label}</span>`;
    card.addEventListener("click", () => {
      if (gift.id === "gift2") showScreen("music");
      else if (gift.id === "gift3") showScreen("letter");
      else showScreen("gift1");
    });
    giftRow.appendChild(card);
  });

  /* Gift 2: YouTube video */

  document.getElementById("video-title").textContent = siteConfig.videoTitle;

  const videoFrame = document.getElementById("video-frame");
  const videoFallbackLink = document.getElementById("video-fallback-link");
  const youtubeId = siteConfig.video.youtubeId;
  let videoLoaded = false;

  if (youtubeId) {
    videoFallbackLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;
  }

  function loadVideoIfNeeded() {
    if (videoLoaded || !youtubeId) return;
    videoFrame.src = `https://www.youtube.com/embed/${youtubeId}?rel=0`;
    videoLoaded = true;
  }

  function unloadVideo() {
    // stop playback when navigating away
    if (videoLoaded) {
      videoFrame.src = "";
      videoLoaded = false;
    }
  }

  /* Screen 7: Letter */

  document.getElementById("letter-greeting").textContent = letterContent.greeting;
  document.getElementById("letter-signature").textContent = letterContent.signature;

  const letterBody = document.getElementById("letter-body");
  letterContent.paragraphs.forEach((p) => {
    const para = document.createElement("p");
    para.textContent = p;
    letterBody.appendChild(para);
  });

})();
