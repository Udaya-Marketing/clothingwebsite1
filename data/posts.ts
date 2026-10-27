export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
  paragraphs: string[];
};

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1500&q=85`;

export const posts: JournalPost[] = [
  {
    slug: "a-wardrobe-that-breathes",
    title: "A wardrobe that breathes",
    excerpt:
      "A small guide to buying less, choosing well, and making room for the pieces that feel like you.",
    category: "The Serein point of view",
    date: "October 12, 2026",
    readTime: "5 min read",
    image: image("photo-1490481651871-ab68de25d43d"),
    alt: "An open wardrobe with thoughtful natural-fibre clothing in calm tones",
    paragraphs: [
      "A wardrobe does not need to hold every possibility. Often, the pieces we return to are the ones that ask the least of us: a shirt that falls just right, a layer that meets the weather, a familiar texture against the skin.",
      "We begin with a simple question: will this feel good to wear often? Natural fibres, considered shapes, and colors that sit easily together give a piece more ways into the day. Not a uniform, but a little less decision-making.",
      "Caring for what we already own is part of the same thought. Wash gently, let things air, and repair the small things early. A garment becomes more personal with time; its softness, its small marks, its familiar place on the hook.",
    ],
  },
  {
    slug: "linen-in-good-light",
    title: "Linen, in good light",
    excerpt:
      "On the beauty of a natural crease, the warmth of a long afternoon, and clothes that move with both.",
    category: "Materials & making",
    date: "September 26, 2026",
    readTime: "4 min read",
    image: image("photo-1525507119028-ed4c629a60a3"),
    alt: "A light linen garment hanging in warm afternoon light",
    paragraphs: [
      "There is a particular kind of ease to linen. It catches the air, softens with wear, and carries the quiet evidence of a day lived in it. We prefer that natural crease to the idea of perfect.",
      "For our warm-weather pieces, we look for linen with a hand that feels comfortable from the first wear. The weave gives the fabric its character: breathable, tactile, and just structured enough to hold a shape.",
      "Wash on a gentle cycle and let the fabric dry naturally when you can. A light steam brings it back; leaving a little texture is part of the point.",
    ],
  },
  {
    slug: "the-art-of-wearing-again",
    title: "The art of wearing again",
    excerpt:
      "Why the most meaningful piece in a closet may be the one you have worn a hundred times.",
    category: "Living with less",
    date: "August 18, 2026",
    readTime: "3 min read",
    image: image("photo-1485230895905-ec40ba36b9bc"),
    alt: "A well-loved everyday outfit in soft, natural light",
    paragraphs: [
      "The first wear is only the beginning of a garment's story. The pieces that become ours are shaped by repetition: the familiar sleeve, the pocket we reach for, the color that keeps meeting us in the morning.",
      "Making clothes to be worn again means paying attention to more than a first impression. It means choosing fabrics that age honestly and shapes that leave room for a life beyond the fitting room.",
      "Wear it often. Mend it when it needs you. Let it become one of the good things you do not have to think twice about.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
