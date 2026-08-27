// Site config: edit this file to personalize the whole site.
const siteConfig = {
  question: "Do you love me? ❤️",
  noEscalationHeadings: [
    "Est-ce que tu m'aimes ? 🥺👉👈💖",   // noClicks = 0 (not shown, kept for reference)
    "Attends... tu es vraiment sûr(e) ? 🥺💔",   // noClicks = 1
    "Euh non, mauvaise réponse... 😜✨",             // noClicks = 2
    "Petit bug, on réessaie ! 🎯🔄"              // noClicks >= 3
  ],
  yesMessage: "Je savais tellement que tu dirais OUI ! 🥰🎉✨",

  // Gift 1: the memories scrapbook
  giftOneTitle: "Nos plus beaux souvenirs ensemble 🖼️ princesse d'amour 💕",

  // Gift 2: a YouTube video (e.g. "our song")
  videoTitle: "Une chanson qui me fait penser à nous 🎶🎧",
  video: {
    // Paste just the ID from the YouTube URL, e.g. for
    // https://www.youtube.com/watch?v=dQw4w9WgXcQ the id is "dQw4w9WgXcQ"
    youtubeId: "dQw4w9WgXcQ" // <- replace with your own video ID
  },

  gifts: [
    { id: "gift1", label: "GIFT 1" },
    { id: "gift2", label: "GIFT 2" },
    { id: "gift3", label: "GIFT 3" }
  ]
};
