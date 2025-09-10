export const accessLabels = [
  {
    title: "Level 1",
    category: "General",
    id: "levelOneCheck",
    description:
      "Level 1 users have the highest access across the system. They can manage all aspects of the business, including menus, branches, tickets, and user permissions across all locations.",
    permissions: [
      "Menu Management",
      "Branch Management",
      "QR Code Management",
      "Link Generation (Online Ordering)",
      "Ticket Management",
      "Till Operations",
      "Refund on Till",
      "Refund on Trootab",
      "Reports & Analytics",
      "User  Management",
    ],
  },
  {
    title: "Level 2",
    category: "Inventory",
    id: "levelTwoCheck",
    description:
      "Level 2 users manage their specific branch. They can handle menus, tickets, QR codes, and user roles within their branch, but cannot oversee other branches.",
    permissions: [
      "Menu Management (branch only)",
      "QR Code Management (branch only)",
      "Link Generation (branch only)",
      "Ticket Management (branch only)",
      "Till Operations (branch only)",
      "Refund on Till (branch only)",
      "Refund on Trootab (branch only)",
      "Branch Reports & Analytics",
      "User  Management (branch staff only)",
    ],
  },
  {
    title: "Level 3",
    category: "Ticket",
    id: "levelThreeCheck",
    description:
      " Level 3 users have limited access, focusing on daily tasks such as handling tickets, tips, and orders. Their permissions are restricted to specific apps like Troo Till and  Troo Waiter .",
    permissions: [
      "Menu Access (View only)",
      "Ticket Access (open and close)",
      "Till Operations",
    ],
  },
];
