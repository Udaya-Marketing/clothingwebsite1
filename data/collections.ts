export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  categories: Array<"Women" | "Men" | "Accessories">;
};

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

export const collections: Collection[] = [
  {
    slug: "soft-forms",
    title: "Soft forms",
    subtitle: "The Serein wardrobe",
    description:
      "A thoughtful collection of easy layers, natural textures, and quiet shapes. Made to work together, feel like your own, and find their way into the everyday.",
    image: image("photo-1483985988355-763728e1935b"),
    alt: "An easy, natural wardrobe styled in warm late-afternoon light",
    categories: ["Women", "Men", "Accessories"],
  },
  {
    slug: "womenswear",
    title: "Women's wear",
    subtitle: "Ease, in every detail",
    description:
      "Soft tailoring, washed cotton, and considered layers for days that unfold at their own pace. Designed with room to move and the ease to wear on repeat.",
    image: image("photo-1539109136881-3be0616acf4b"),
    alt: "A relaxed women's silhouette in natural light",
    categories: ["Women"],
  },
  {
    slug: "menswear",
    title: "Men's wear",
    subtitle: "Quietly considered",
    description:
      "An edit of useful, enduring essentials: easy knits, softly structured shirting, and thoughtful details that make getting dressed feel simple.",
    image: image("photo-1515886657613-9f3515b0c78f"),
    alt: "Modern relaxed menswear in an understated city setting",
    categories: ["Men"],
  },
  {
    slug: "accessories",
    title: "Everyday objects",
    subtitle: "The finishing touch",
    description:
      "Useful companions for the everyday, made with the same attention to material, form, and the pleasure of a piece well chosen.",
    image: image("photo-1490481651871-ab68de25d43d"),
    alt: "A considered collection of natural-toned everyday accessories",
    categories: ["Accessories"],
  },
];

export const getCollection = (slug: string) =>
  collections.find((collection) => collection.slug === slug);
