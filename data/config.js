// Site config: edit this file to personalize the whole site.
const siteConfig = {
  question: "Do you love me? ❤️",
  noEscalationHeadings: [
    "Do you love me? ❤️",   // noClicks = 0 (not shown, kept for reference)
    "nah that's not right...",   // noClicks = 1
    "be serious...",             // noClicks = 2
    "be serious..."              // noClicks >= 3
  ],
  yesMessage: "I knew you'd say yes 💕",

  // Gift 1: the memories scrapbook
  giftOneTitle: "A few of our favorite moments",

  // Gift 2: a YouTube video (e.g. "our song")
  videoTitle: "A song that reminds me of us",
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
