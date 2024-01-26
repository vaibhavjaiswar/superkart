enum Category {
  'electronics' = 'electronics',
  'fashion' = 'fashion',
  'home-appliances' = 'home-appliances',
}

enum CategoryLabel {
  'Electronics' = 'Electronics',
  'Fashion' = 'Fashion',
  'Home Appliances' = 'Home Appliances',
}

enum SubCategory {
  'cameras' = 'cameras',
  'fans' = 'fans',
  'headphones' = 'headphones',
  'iron-press' = 'iron-press',
  'jeans' = 'jeans',
  'laptops' = 'laptops',
  'mixer-grinders' = 'mixer-grinders',
  'mobiles' = 'mobiles',
  'powerbanks' = 'powerbanks',
  'projectors' = 'projectors',
  'random' = 'random',
  'shirts' = 'shirts',
  'shoes' = 'shoes',
  'spectacles' = 'spectacles',
  't-shirts' = 't-shirts',
  'wrist-watches' = 'wrist-watches',
}

enum SubCategoryLabel {
  'Cameras' = 'Cameras',
  'Fans' = 'Fans',
  'Headphones' = 'Headphones',
  'Iron Press' = 'Iron Press',
  'Jeans' = 'Jeans',
  'Laptops' = 'Laptops',
  'Mixer Grinders' = 'Mixer Grinders',
  'Mobiles' = 'Mobiles',
  'Powerbanks' = 'Powerbanks',
  'Projectors' = 'Projectors',
  'Random' = 'Random',
  'Shirts' = 'Shirts',
  'Shoes' = 'Shoes',
  'Spectacles' = 'Spectacles',
  'T Shirts' = 'T Shirts',
  'Wrist Watches' = 'Wrist Watches',
}

export const CategoryMap = new Map<string, string>([
  [Category.electronics, CategoryLabel.Electronics],
  [Category.fashion, CategoryLabel.Fashion],
  [Category["home-appliances"], CategoryLabel["Home Appliances"]],
  [CategoryLabel.Electronics, Category.electronics],
  [CategoryLabel.Fashion, Category.fashion],
  [CategoryLabel["Home Appliances"], Category["home-appliances"]],
])

export const SubCategoryMap = new Map<string, string>([
  [SubCategory.cameras, SubCategoryLabel.Cameras],
  [SubCategory.fans, SubCategoryLabel.Fans],
  [SubCategory.headphones, SubCategoryLabel.Headphones],
  [SubCategory["iron-press"], SubCategoryLabel["Iron Press"]],
  [SubCategory.jeans, SubCategoryLabel.Jeans],
  [SubCategory.laptops, SubCategoryLabel.Laptops],
  [SubCategory["mixer-grinders"], SubCategoryLabel["Mixer Grinders"]],
  [SubCategory.mobiles, SubCategoryLabel.Mobiles],
  [SubCategory.powerbanks, SubCategoryLabel.Powerbanks],
  [SubCategory.projectors, SubCategoryLabel.Projectors],
  [SubCategory.random, SubCategoryLabel.Random],
  [SubCategory.shirts, SubCategoryLabel.Shirts],
  [SubCategory.shoes, SubCategoryLabel.Shoes],
  [SubCategory.spectacles, SubCategoryLabel.Spectacles],
  [SubCategory["t-shirts"], SubCategoryLabel["T Shirts"]],
  [SubCategory["wrist-watches"], SubCategoryLabel["Wrist Watches"]],
])