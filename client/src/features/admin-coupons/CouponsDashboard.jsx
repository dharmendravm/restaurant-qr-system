import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthError from "@/components/auth/AuthError";
import { fetchCoupons, toggleCouponStatus } from "@/store/admin/couponSlice"; // Ye actions aapke slice me hone chahiye

const CouponsDashboard = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth?.user?.role);
  const isViewer = role === "viewer";
  
  const { items: coupons, loading, error, pageLoading } = useSelector((state) => state.adminCoupons);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleToggle = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleCouponStatus(id));
  };

  const stats = {
    total: coupons?.length || 0,
    active: coupons?.filter((c) => c.isActive).length || 0,
    inactive: coupons?.filter((c) => !c.isActive).length || 0,
  };

  if (pageLoading) return <div className="p-10 text-center">Loading coupons...</div>;

  return (
    <div className="min-h-screen bg-app-bg px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-semibold text-text-main">Coupons Overview</h1>
          <p className="text-sm text-text-muted mt-1">Manage active and inactive discount coupons</p>
          <AuthError message={error} />
        </header>

        {/* Stats Section (Now Dynamic) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatBox label="Total Coupons" value={stats.total} color="text-text-main" />
          <StatBox label="Active Coupons" value={stats.active} color="text-success" />
          <StatBox label="Inactive Coupons" value={stats.inactive} color="text-danger" />
        </div>

        {/* Table logic same rahega, bas map 'coupons' par hoga */}
        <div className="bg-card-bg/60 border border-border rounded-2xl overflow-hidden">
          {/* ... Table UI Header ... */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted-bg text-text-muted">
                <tr>
                  <th className="text-left px-6 py-3">Code</th>
                  <th className="text-left px-6 py-3">Type</th>
                  <th className="text-left px-6 py-3">Value</th>
                  <th className="text-left px-6 py-3">Usage</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-right px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length === 0 ? (
                  <tr><td colSpan="6" className="px-6 py-10 text-center text-text-muted">No coupons found</td></tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr key={coupon._id} className="border-t hover:bg-hover transition">
                      <td className="px-6 py-4 font-medium text-text-main">{coupon.couponCode}</td>
                      <td className="px-6 py-4 text-text-muted capitalize">{coupon.discountType}</td>
                      <td className="px-6 py-4 text-text-muted">
                        {coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                      </td>
                      <td className="px-6 py-4 text-text-muted">
                        {coupon.usedCount || 0} / {coupon.usageLimit}
                      </td>
                      <td className="px-2">
                        <input
                          type="checkbox"
                          disabled={loading || isViewer} // Viewer is read-only.
                          checked={coupon.isActive}
                          onChange={(e) => handleToggle(e, coupon._id)}
                          className="toggle toggle-sm bg-danger border-danger checked:bg-success"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!isViewer && (
                          <button className="text-sm text-brand-main hover:underline">Edit</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }) => (
  <div className="rounded-2xl border border-border bg-card-bg/60 p-6">
    <p className="text-sm text-text-muted">{label}</p>
    <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
  </div>
);

export default CouponsDashboard;
