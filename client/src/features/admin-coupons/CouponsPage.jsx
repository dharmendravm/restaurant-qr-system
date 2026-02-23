import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, clearError } from "@/store/admin/couponSlice";
import CouponsDashboard from "./CouponsDashboard";
import AuthError from "@/components/auth/AuthError";

const AddCouponPage = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth?.user?.role);
  const isViewer = role === "viewer";
  
  const initialForm = {
    couponCode: "",
    discountType: "",
    discountValue: "",
    maxDiscount: "",
    minOrderAmount: "",
    usageLimit: "",
    validFrom: "",
    validTo: "",
    description: "",
  };

  // Redux store se loading aur error state nikalna
  const { loading, error } = useSelector((state) => state.coupon);

  const [form, setForm] = useState(initialForm);

  const onChange = (e) => {
    const { name, value } = e.target;
    
    if (error) dispatch(clearError());

    setForm((prev) => ({
      ...prev,
      [name]: name === "couponCode" ? value.toUpperCase() : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isViewer) return;
    
    // Redux action dispatch karna
    const result = await dispatch(createCoupon(form));

    // Agar coupon successfully ban gaya (fulfilled) toh form reset karo
    if (createCoupon.fulfilled.match(result)) {
      setForm(initialForm);
      // Aap yahan toast.success("Coupon Created!") bhi daal sakte ho
    }
  };

  return (
    <>
      <div className="min-h-screen bg-app-bg px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <p className="text-xs uppercase tracking-widest text-text-muted">Admin / Coupons</p>
            <h1 className="text-3xl font-semibold text-text-main">Add New Coupon</h1>
            <p className="text-sm text-text-muted mt-1">Create discount coupons for customer orders</p>
          </header>

          <div className="bg-card-bg/50 border border-border rounded-2xl shadow-sm p-7 space-y-8">
            {/* Redux wala error yahan dikhega */}
            <AuthError message={error} />

            <form onSubmit={handleFormSubmit}>
              {isViewer && (
                <div className="mb-5 rounded-xl border border-border bg-hover/40 px-4 py-3 text-sm text-text-muted">
                  Viewer mode: form is visible for demo, but create action is disabled.
                </div>
              )}
              {/* Section 1: Details */}
              <section className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main mb-4">Coupon Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Coupon Code</label>
                    <input
                      name="couponCode"
                      value={form.couponCode}
                      onChange={onChange}
                      disabled={isViewer}
                      type="text"
                      placeholder="SAVE50"
                      required
                      className="w-full uppercase tracking-wider rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Discount Type</label>
                    <select
                      name="discountType"
                      value={form.discountType}
                      onChange={onChange}
                      disabled={isViewer}
                      required
                      className="w-full rounded-xl border px-4 py-2.5 text-sm bg-card-bg focus:ring-2 focus:ring-brand-main/60"
                    >
                      <option value="" disabled>Select type</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixedAmount">Flat Amount (₹)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 2: Rules */}
              <section className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main mb-4">Discount Rules</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Discount Value</label>
                    <input
                      name="discountValue"
                      value={form.discountValue}
                      onChange={onChange}
                      disabled={isViewer}
                      type="number"
                      required
                      placeholder="50"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Max Discount</label>
                    <input
                      name="maxDiscount"
                      value={form.maxDiscount}
                      onChange={onChange}
                      disabled={isViewer}
                      type="number"
                      placeholder="200"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Minimum Order (₹)</label>
                    <input
                      name="minOrderAmount"
                      value={form.minOrderAmount}
                      onChange={onChange}
                      disabled={isViewer}
                      type="number"
                      placeholder="499"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                </div>
              </section>

              {/* Section 3: Usage */}
              <section className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main mb-4">Usage & Validity</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Usage Limit</label>
                    <input
                      name="usageLimit"
                      value={form.usageLimit}
                      onChange={onChange}
                      disabled={isViewer}
                      type="number"
                      placeholder="100"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Valid From</label>
                    <input
                      name="validFrom"
                      value={form.validFrom}
                      onChange={onChange}
                      disabled={isViewer}
                      type="date"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Valid To</label>
                    <input
                      name="validTo"
                      value={form.validTo}
                      onChange={onChange}
                      disabled={isViewer}
                      type="date"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Description */}
              <section className="mb-8">
                <label className="block text-sm font-medium text-text-main mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  disabled={isViewer}
                  rows={3}
                  placeholder="Flat 50% off on orders above ₹499"
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-brand-main/60"
                />
              </section>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-5 border-t">
                <button
                  type="button"
                  disabled={isViewer}
                  onClick={() => setForm(initialForm)}
                  className="px-6 py-2 rounded-xl text-sm text-text-main hover:bg-brand-fade transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || isViewer}
                  className="px-7 py-2.5 rounded-xl text-sm font-medium text-white
                    bg-linear-to-r from-brand-main to-orange-500 shadow-md cursor-pointer 
                    disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isViewer ? "Create Disabled (Viewer)" : loading ? "Creating..." : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CouponsDashboard />
    </>
  );
};

export default AddCouponPage;
