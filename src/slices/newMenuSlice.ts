/**

    post endpoint : 
/api/v1/catalog/items/

payload {
  "name": "string",
  "description": "string",
  "is_active": true,
  "sort_order": 2147483647,
  "all_locations": true,
  "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "subcategory_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tag_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "allergy_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "location_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "station_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "modifier_groups": [
    {
      "modifier_group_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "description": "",
      "sort_order": 0,
      "is_active": true,
      "required": true,
      "min_selections": 0,
      "max_selections": 0,
      "modifiers": [
        {
          "name": "string",
          "price_delta": "0.00",
          "sort_order": 0,
          "is_active": true
        }
      ]
    }
  ],
  "variants": [
    {
      "variant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sort_order": 0,
      "required": true,
      "min_selections": 0,
      "max_selections": 0,
      "options": [
        {
          "name": "string",
          "sort_order": 0,
          "price_delta": "0.00",
          "is_active": true
        }
      ]
    }
  ],
  "auto_generate_variations": true,
  "default_variation": {
    "price": "0.00",
    "sku": "",
    "is_taxable": false,
    "tax_ids": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ]
  }
}




 */