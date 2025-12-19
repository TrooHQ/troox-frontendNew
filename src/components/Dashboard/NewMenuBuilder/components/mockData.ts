export interface MenuItem {
  id: string;
  image: string; // Placeholder or URL
  name: string;
  sku: string;
  category: string;
  price: number;
  type: string;
  tags: string[];
}

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "2",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "3",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "4",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "5",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
];

export interface Category {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  branch: "Local" | "Global";
  description?: string;
  sub_categories?: { name: string; description: string }[];
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Burger",
    status: "Active",
    branch: "Local",
    description: "Juicy grilled beef patty served in a fresh bun with toppings.",
    sub_categories: [
      { name: "Cheese Burger", description: "With extra cheese" },
      { name: "Chicken Burger", description: "Grilled chicken breast" },
      { name: "Veggie Burger", description: "Plant-based patty" },
    ],
  },
  {
    id: "2",
    name: "Pizza",
    status: "Inactive",
    branch: "Global",
    description: "Italian classic with tomato sauce and cheese.",
    sub_categories: [
      { name: "Margherita", description: "Classic cheese and tomato" },
      { name: "Pepperoni", description: "Spicy pepperoni slices" },
    ],
  },
  {
    id: "3",
    name: "Drinks",
    status: "Active",
    branch: "Global",
    description: "Cold and hot beverages.",
    sub_categories: [
      { name: "Soft Drinks", description: "Cola, Sprite, Fanta" },
      { name: "Juices", description: "Freshly squeezed" },
    ],
  },
  {
    id: "4",
    name: "Desserts",
    status: "Active",
    branch: "Global",
    description: "Sweet treats after meal.",
    sub_categories: [],
  },
  {
    id: "5",
    name: "Salads",
    status: "Active",
    branch: "Local",
    description: "Fresh and healthy greens.",
    sub_categories: [
        { name: "Caesar Salad", description: "Romaine lettuce and croutons" },
        { name: "Greek Salad", description: "Feta cheese and olives" },
    ],
  },
];

export const statsData = [
  { label: "Total items", value: 90 },
  { label: "Categories", value: 8 },
  { label: "Global items", value: 34 },
  { label: "Local items", value: 56 },
];
