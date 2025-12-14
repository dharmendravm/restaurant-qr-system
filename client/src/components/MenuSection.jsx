// import { useSelector, useDispatch } from "react-redux";
// import { fetchMenuItems, setSelectedCategory } from "@/redux/menuSlice";
// import { useEffect } from "react";

// /* --------------------------------------------
//    ⭐ MenuCard Component (Simple + Light Theme)
// --------------------------------------------- */
// const MenuCard = ({ item }) => {
//   return (
//     <div className="bg-white rounded-xl border border-[#e9dccb] shadow-sm hover:shadow-md transition overflow-hidden">
//       {/* Image Section */}
//       <div className="h-44 w-full overflow-hidden">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; // fallback
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4 space-y-2">
//         {/* Name + Price */}
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-[#1b130c]">{item.name}</h3>
//           <p className="text-lg font-semibold text-[#1b130c]">₹{item.price}</p>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-[#7d6b5a] line-clamp-2">
//           {item.description}
//         </p>

//         {/* Category + Add Button */}
//         <div className="flex items-center justify-between pt-2">
//           <span className="text-xs text-[#9c8f83] uppercase tracking-wide">
//             {item.category}
//           </span>

//           <button className="px-4 py-2 bg-[#1b130c] text-white rounded-lg text-sm font-medium hover:bg-[#2b1d12] transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* --------------------------------------------
//    ⭐ MenuSection Component (No-Framer Version)
// --------------------------------------------- */
// const MenuSection = () => {
//   const dispatch = useDispatch();

//   const { menuItems, categories, selectedCategory } = useSelector(
//     (state) => state.menu
//   );

//   // Fetch menu when category changes
//   useEffect(() => {
//     dispatch(fetchMenuItems(selectedCategory));
//   }, [selectedCategory]);

//   return (
//     <section id="menu-section" className="space-y-8 pt-12 ">
//       {/* Title */}
//       <div>
//         <h2 className="text-xl md:text-2xl font-extrabold text-[#1b130c]">
//           Our Signature Dishes
//         </h2>
//         <p className="text-[12px] text-[#8b8278] max-w-md mt-1">
//           From classic favorites to modern culinary creations, each dish is made
//           with fresh ingredients & an extra dash of love.
//         </p>
//       </div>

//       {/* Category Filters */}
//       <div className="flex flex-wrap gap-2">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => dispatch(setSelectedCategory(cat))}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition border
//               ${
//                 selectedCategory === cat
//                   ? "bg-[#1b130c] text-white border-[#1b130c]"
//                   : "bg-[#fff3df] text-[#8b3a1a] border-[#f1d5b3] hover:bg-[#ffe8c7]"
//               }
//             `}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Menu Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {menuItems.map((item) => (
//           <MenuCard key={item._id} item={item} />
//         ))}
//       </div>

//       {/* No Data Message */}
//       {menuItems.length === 0 && (
//         <p className="text-center text-[#7d6b5a] py-12">No items available.</p>
//       )}
//     </section>
//   );
// };

// export default MenuSection;
