import React, { useState } from "react";
import { Plus, Trash2, UtensilsCrossed } from "lucide-react";
import { MenuCard } from "@/components/ui/MenuCard";
import { useToast } from "@/components/ui/toast";


const AdminMenu = () => {
  const { success, info } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    price: "",
    category: "Main Course",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price) return;

    const newItem = {
      id: Date.now(),
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      category: formData.category || "Other",
      price: Number(formData.price),
      badge: "Custom",
      image:
        formData.image ||
        "https://images.pexels.com/photos/5908225/pexels-photo-5908225.jpeg?auto=compress&cs=tinysrgb&w=800",
    };


    setFormData({ title: "", subtitle: "", price: "", category: "Main Course", image: "" });
    success("Dish added", `${newItem.title} added to menu.`);
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    info("Dish removed", "Item removed from admin menu.");
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#fff1d6] px-3 py-1 text-[11px] font-semibold text-[#8b3a1a] border border-[#f5d9aa] mb-2">
            <UtensilsCrossed className="w-3 h-3" /> Admin • Menu Management
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b130c]">
            All Menu Items
          </h1>
          <p className="text-[12px] text-[#8b8278] max-w-md mt-1">
            Add, edit or remove dishes from your restaurant menu. Changes here should
            reflect for all customers once you connect it with the backend API.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.1fr] gap-8 items-start">
        {/* All items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        </div>

        {/* Add item form */}
        <aside className="bg-[#fffdf8] border border-[#f3e2d2] rounded-3xl p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] space-y-3">
          <h3 className="text-lg font-extrabold text-[#1b130c] flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#f97316]" /> Add New Dish
          </h3>
          <p className="text-[11px] text-[#8b8278]">
            Use this form to add new dishes. Later you can hook this with your
            Node/Express menu APIs.
          </p>

          <form onSubmit={handleAddItem} className="space-y-3 text-[11px]">
            <div>
              <label className="mb-1 block font-medium text-[#5f4a3a]">Dish name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Peri Peri Fries"
                className="w-full rounded-xl border border-[#f0dfcf] bg-white px-3 py-2 text-xs text-[#1b130c] placeholder-[#b9a89a] focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]/40"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#5f4a3a]">Short description</label>
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                rows={2}
                placeholder="Small description visible on the card"
                className="w-full rounded-xl border border-[#f0dfcf] bg-white px-3 py-2 text-xs text-[#1b130c] placeholder-[#b9a89a] focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]/40 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-medium text-[#5f4a3a]">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="199"
                  className="w-full rounded-xl border border-[#f0dfcf] bg-white px-3 py-2 text-xs text-[#1b130c] placeholder-[#b9a89a] focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]/40"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-[#5f4a3a]">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#f0dfcf] bg-white px-3 py-2 text-xs text-[#1b130c] focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]/40"
                >
                  <option>Starters</option>
                  <option>Main Course</option>
                  <option>Breads</option>
                  <option>Desserts</option>
                  <option>Beverages</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#5f4a3a]">Image URL (optional)</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste a food image URL"
                className="w-full rounded-xl border border-[#f0dfcf] bg-white px-3 py-2 text-xs text-[#1b130c] placeholder-[#b9a89a] focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]/40"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-[#f97316] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_28px_rgba(249,115,22,0.55)] hover:bg-[#ea580c] active:scale-95 transition"
            >
              Add to Menu
            </button>
          </form>
        </aside>
      </section>
    </div>
  );
};

export default AdminMenu;
