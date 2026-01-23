export interface CategoryItemProp {
  _id: string;
  created_by: string;
  branch: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  //
  sku?: string;
  category?: string;
}

// Modifier type
export interface ModifierProp {
  _id: string;
  created_by: string;
  branch: string;
  menu_group_name: string;
  menu_item_name: string;
  modifier_name: string;
  modifier_image: string;
  modifier_price: number;
  attached_to: string;
  modifier_group_name: string;
  modifier_group: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Modifier Group type
export interface ModifierGroupProp {
  _id: string;
  created_by: string;
  branch: string;
  modifier_group_name: string;
  menu_item_name: string;
  menu_group_name: string;
  modifiers: ModifierProp[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Menu Item type
export interface MenuItemProp {
  _id: string;
  created_by: string;
  branch: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  description: string;
  menu_item_image: string;
  menu_item_price: number;
  is_frozen: boolean;
  is_recommended: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  modifierGroups: ModifierGroupProp[];
  complimentary: ModifierProp[];

  sku?: string;
  category?: string;
  type?: string;
  tags?: string[];
}
