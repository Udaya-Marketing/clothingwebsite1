export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Women" | "Men" | "Accessories";
  price: number;
  compareAtPrice?: number;
  badge?: string;
  color: string;
  sizes: string[];
  image: string;
  hoverImage: string;
  alt: string;
  description: string;
};

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const products: Product[] = [
  {
    id: "p-001",
    slug: "oversized-linen-shirt",
    name: "Oversized linen shirt",
    category: "Women",
    price: 88,
    compareAtPrice: 118,
    badge: "New",
    color: "Chalk",
    sizes: ["XS", "S", "M", "L"],
    image: image("photo-1591047139829-d91aecb6caea"),
    hoverImage: image("photo-1598033129183-c4f50c736f10"),
    alt: "Relaxed ivory linen shirt with a soft, natural drape",
    description:
      "A little room to move, a soft collar, and the natural ease of linen. This oversized shirt layers lightly over a tank or finds its own way with relaxed tailoring.",
  },
  {
    id: "p-002",
    slug: "everyday-cotton-tee",
    name: "Everyday cotton tee",
    category: "Women",
    price: 42,
    compareAtPrice: 56,
    badge: "Bestseller",
    color: "Ecru",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: image("photo-1521572163474-6864f9cf17ab"),
    hoverImage: image("photo-1503342217505-b0a15ec3261c"),
    alt: "Soft cotton crew-neck tee in a warm off-white shade",
    description:
      "The tee you reach for before thinking twice. Soft cotton, an easy crew neck, and a quietly relaxed fit make this everyday layer feel like an old favorite.",
  },
  {
    id: "p-003",
    slug: "wide-leg-tailored-trouser",
    name: "Wide-leg tailored trouser",
    category: "Women",
    price: 112,
    compareAtPrice: 145,
    color: "Mushroom",
    sizes: ["XS", "S", "M", "L"],
    image: image("photo-1506629905607-d9b1ee7b31a6"),
    hoverImage: image("photo-1509631179647-0177331693ae"),
    alt: "Fluid wide-leg trousers in a muted mushroom neutral",
    description:
      "A fluid leg and a considered rise give these tailored trousers their unhurried shape. Wear them with a simple tee, a soft knit, or whatever the day asks for.",
  },
  {
    id: "p-004",
    slug: "soft-structure-knit",
    name: "Soft structure knit",
    category: "Men",
    price: 96,
    compareAtPrice: 128,
    badge: "New",
    color: "Oat",
    sizes: ["S", "M", "L", "XL"],
    image: image("photo-1618354691373-d851c5c3a990"),
    hoverImage: image("photo-1618354691229-88d47f285158"),
    alt: "Lightweight oat-toned knit pullover with a clean silhouette",
    description:
      "A lightweight knit with enough structure to hold its shape and enough softness to stay in rotation. An easy layer for cool mornings and quieter evenings.",
  },
  {
    id: "p-005",
    slug: "weekend-canvas-tote",
    name: "Weekend canvas tote",
    category: "Accessories",
    price: 38,
    compareAtPrice: 48,
    color: "Natural",
    sizes: ["One size"],
    image: image("photo-1590874103328-eac38a683ce7"),
    hoverImage: image("photo-1544816155-12df9643f363"),
    alt: "Natural canvas carryall with understated everyday detailing",
    description:
      "A dependable canvas carryall for market mornings, books, and everything in between. Simple in shape, easy to fold, and ready to go wherever the day wanders.",
  },
  {
    id: "p-006",
    slug: "relaxed-cotton-poplin",
    name: "Relaxed cotton poplin",
    category: "Men",
    price: 84,
    compareAtPrice: 110,
    badge: "New",
    color: "Cloud",
    sizes: ["S", "M", "L", "XL"],
    image: image("photo-1603252109303-2751441dd157"),
    hoverImage: image("photo-1603252110481-7ba873bf42ab"),
    alt: "Easy-fit white poplin shirt with a softly structured collar",
    description:
      "Clean poplin, a softly structured collar, and a little space through the body. This relaxed shirt slips easily into a weekday, then stays on for the weekend.",
  },
  {
    id: "p-007",
    slug: "ribbed-tank-top",
    name: "Ribbed tank top",
    category: "Women",
    price: 36,
    compareAtPrice: 48,
    color: "Stone",
    sizes: ["XS", "S", "M", "L"],
    image: image("photo-1503341504253-dff4815485f1"),
    hoverImage: image("photo-1566206091558-7f218b696731"),
    alt: "Fine-ribbed sleeveless top in a soft stone color",
    description:
      "A fine rib and a close, comfortable fit give this simple tank a little more character. Wear it alone in the warmth or make it the first layer under a shirt.",
  },
  {
    id: "p-008",
    slug: "everyday-leather-belt",
    name: "Everyday leather belt",
    category: "Accessories",
    price: 58,
    compareAtPrice: 76,
    color: "Cognac",
    sizes: ["S", "M", "L"],
    image: image("photo-1624222247344-550fb8d4a9f7"),
    hoverImage: image("photo-1553062407-98eeb64c6a62"),
    alt: "Minimal cognac leather belt with a softly brushed buckle",
    description:
      "An everyday belt in warm cognac leather, finished with a quietly brushed buckle. A useful finishing detail that looks more familiar with every wear.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
