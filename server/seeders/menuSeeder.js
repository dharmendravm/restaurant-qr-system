import mongoose from 'mongoose';
import Menu from '../models/menu.js';
import ConnectDB from '../config/database.js';


const menuItems = [

  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan cheese, croutons, and classic caesar dressing',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    price: 299,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, basil, garlic, and mozzarella',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    price: 249,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Mozzarella Sticks',
    description: 'Golden fried mozzarella cheese sticks served with marinara sauce',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    price: 199,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Vegetable Spring Rolls',
    description: 'Crispy spring rolls filled with fresh vegetables, served with sweet and sour sauce',
    image: 'https://images.unsplash.com/photo-1615367423057-4b46b8a1d69a?w=800&h=600&fit=crop',
    price: 179,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Hummus with Pita',
    description: 'Creamy hummus served with warm pita bread and fresh vegetables',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
    price: 219,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    price: 279,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers and onions',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    price: 329,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Vegetable Samosa',
    description: 'Crispy fried pastry filled with spiced potatoes and peas, served with chutney',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop',
    price: 149,
    category: 'Appetizers',
    isAvailable: true
  },
  {
    name: 'Stuffed Mushrooms',
    description: 'Button mushrooms stuffed with herbs and cheese, baked to perfection',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop',
    price: 269,
    category: 'Appetizers',
    isAvailable: true
  },

  // Soups
  {
    name: 'Tomato Soup',
    description: 'Creamy tomato soup with fresh herbs, served with croutons',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    price: 179,
    category: 'Soups',
    isAvailable: true
  },
  {
    name: 'Vegetable Soup',
    description: 'Hearty mixed vegetable soup with herbs and spices',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    price: 169,
    category: 'Soups',
    isAvailable: true
  },
  {
    name: 'Mushroom Soup',
    description: 'Rich and creamy mushroom soup with a hint of garlic',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop',
    price: 199,
    category: 'Soups',
    isAvailable: true
  },
  {
    name: 'Sweet Corn Soup',
    description: 'Delicious sweet corn soup with vegetables and herbs',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    price: 189,
    category: 'Soups',
    isAvailable: true
  },

  // Main Courses
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',
    price: 399,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Vegetable Burger',
    description: 'Grilled vegetable patty with lettuce, tomato, onion, and special sauce on a brioche bun',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a7290027?w=800&h=600&fit=crop',
    price: 349,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Pasta Primavera',
    description: 'Fresh pasta with seasonal vegetables in a light cream sauce',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    price: 379,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Vegetable Stir Fry',
    description: 'Mixed vegetables stir-fried with garlic and soy sauce, served with steamed rice',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    price: 329,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Eggplant Parmesan',
    description: 'Breaded eggplant slices topped with marinara sauce and melted mozzarella, served over pasta',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop',
    price: 429,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Vegetable Lasagna',
    description: 'Layers of pasta with ricotta, mozzarella, and fresh vegetables in marinara sauce',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    price: 449,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice cooked with mushrooms, parmesan cheese, and herbs',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop',
    price: 399,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Vegetable Curry',
    description: 'Mixed vegetables in a rich coconut curry sauce, served with basmati rice',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    price: 379,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in a rich, creamy tomato-based gravy with butter and spices',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    price: 399,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Dal Makhani',
    description: 'Creamy black lentils cooked overnight with butter and cream, served with rice',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    price: 329,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    price: 349,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in a smooth spinach gravy with spices',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    price: 369,
    category: 'Main Courses',
    isAvailable: true
  },
  {
    name: 'Vegetable Fried Rice',
    description: 'Stir-fried rice with mixed vegetables, soy sauce, and aromatic spices',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    price: 299,
    category: 'Main Courses',
    isAvailable: true
  },

  // Breads & Rotis
  {
    name: 'Garlic Naan',
    description: 'Soft leavened bread brushed with garlic butter and herbs',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    price: 79,
    category: 'Breads & Rotis',
    isAvailable: true
  },
  {
    name: 'Butter Naan',
    description: 'Classic naan bread brushed with butter',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    price: 69,
    category: 'Breads & Rotis',
    isAvailable: true
  },
  {
    name: 'Plain Roti',
    description: 'Whole wheat flatbread, freshly made',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    price: 49,
    category: 'Breads & Rotis',
    isAvailable: true
  },
  {
    name: 'Tandoori Roti',
    description: 'Whole wheat bread baked in a tandoor oven',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    price: 59,
    category: 'Breads & Rotis',
    isAvailable: true
  },
  {
    name: 'Stuffed Paratha',
    description: 'Flaky flatbread stuffed with spiced potatoes',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    price: 99,
    category: 'Breads & Rotis',
    isAvailable: true
  },

  // Desserts
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop',
    price: 249,
    category: 'Desserts',
    isAvailable: true
  },
  {
    name: 'New York Cheesecake',
    description: 'Rich and creamy cheesecake with a graham cracker crust, topped with fresh berries',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&h=600&fit=crop',
    price: 279,
    category: 'Desserts',
    isAvailable: true
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    price: 299,
    category: 'Desserts',
    isAvailable: true
  },
  {
    name: 'Ice Cream Sundae',
    description: 'Three scoops of vanilla ice cream with chocolate sauce, whipped cream, and a cherry',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop',
    price: 199,
    category: 'Desserts',
    isAvailable: true
  },
  {
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings soaked in sweet rose-flavored syrup',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop',
    price: 149,
    category: 'Desserts',
    isAvailable: true
  },
  {
    name: 'Rasgulla',
    description: 'Soft cottage cheese balls in light sugar syrup',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop',
    price: 129,
    category: 'Desserts',
    isAvailable: true
  },
  {
    name: 'Kheer',
    description: 'Traditional rice pudding with cardamom, nuts, and saffron',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop',
    price: 159,
    category: 'Desserts',
    isAvailable: true
  },
  {
    name: 'Brownie with Ice Cream',
    description: 'Warm chocolate brownie served with vanilla ice cream',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop',
    price: 229,
    category: 'Desserts',
    isAvailable: true
  },

  // Beverages
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
    price: 149,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Iced Tea',
    description: 'Refreshing iced tea with lemon',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop',
    price: 99,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Coca Cola',
    description: 'Classic Coca Cola soft drink',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&h=600&fit=crop',
    price: 79,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with fresh lemons and mint',
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2fdc?w=800&h=600&fit=crop',
    price: 119,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Coffee',
    description: 'Freshly brewed coffee',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop',
    price: 99,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop',
    price: 149,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Mango Lassi',
    description: 'Creamy yogurt drink blended with fresh mango',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
    price: 129,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Sweet Lassi',
    description: 'Traditional sweet yogurt drink with cardamom',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
    price: 109,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Masala Chai',
    description: 'Spiced tea with milk, cardamom, and ginger',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop',
    price: 89,
    category: 'Beverages',
    isAvailable: true
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime soda with mint and salt',
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2fdc?w=800&h=600&fit=crop',
    price: 99,
    category: 'Beverages',
    isAvailable: true
  }
];

const seedMenu = async () => {
  try {

    await ConnectDB();
    console.log('Database connected');

   
    await Menu.deleteMany({});
    console.log('Cleared existing menu items');

   
    const insertedItems = await Menu.insertMany(menuItems);
    console.log(`Successfully seeded ${insertedItems.length} menu items`);

  
    const categories = await Menu.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\nMenu items by category:');
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} items`);
    });

 
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu:', error);
    process.exit(1);
  }
};


seedMenu();