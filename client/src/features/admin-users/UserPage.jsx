import { fetchAdminUsers } from "@/store/admin/userSlice";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, RefreshCcw, UserCheck, UserX, Users, IndianRupee, MoreVertical } from "lucide-react";

const UserPage = () => {
  const dispatch = useDispatch();
  const { users = [], loading } = useSelector((state) => state.adminUsers);
  const role = useSelector((state) => state.auth?.user?.role);
  const isViewer = role === "viewer";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  if (isViewer) {
    return (
      <div className="min-h-screen bg-app-bg p-4 lg:p-8 text-text-main">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card-bg border border-border rounded-2xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-text-main">User Information Restricted</h1>
            <p className="mt-2 text-sm text-text-muted">
              You are signed in as a viewer. User details are sensitive and are not visible in viewer mode.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredStats = useMemo(() => {
    let customers = users.filter((u) => u.role === "customer");

    if (searchTerm) {
      customers = customers.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      customers = customers.filter(u => u.isActive === (statusFilter === "Active"));
    }

    const totalSpends = customers.reduce((sum, u) => sum + (Number(u.totalSpends) || 0), 0);

    return { 
      rows: customers, 
      total: customers.length, 
      active: customers.filter(u => u.isActive).length,
      blocked: customers.filter(u => !u.isActive).length,
      revenue: totalSpends
    };
  }, [users, searchTerm, statusFilter]);

  return (
    // Background uses --color-app-bg
    <div className="min-h-screen bg-app-bg p-4 lg:p-8 text-text-main transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">User Management</h1>
            <p className="text-text-muted text-sm">Manage customers and monitor growth analytics.</p>
          </div>
          <button 
            onClick={() => dispatch(fetchAdminUsers())}
            className="btn bg-card-bg border-border hover:bg-hover text-text-main normal-case shadow-sm gap-2"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin text-brand-main" : ""} />
            Sync Data
          </button>
        </div>

        {/* Modern Stat Grid - Using your status & brand colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={filteredStats.total} icon={<Users className="text-brand-main" />} />
          <StatCard title="Active" value={filteredStats.active} icon={<UserCheck className="text-success" />} />
          <StatCard title="Blocked" value={filteredStats.blocked} icon={<UserX className="text-danger" />} />
          <StatCard title="Revenue" value={`₹${filteredStats.revenue.toLocaleString('en-IN')}`} icon={<IndianRupee className="text-brand-main" />} />
        </div>

        {/* Table Container - Using --color-card-bg */}
        <div className="bg-card-bg rounded-2xl border border-border shadow-sm overflow-hidden">
          
          {/* Table Controls */}
          <div className="p-5 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-navbar-bg/50">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle" size={18} />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="input input-bordered w-full pl-10 bg-app-bg border-border focus:border-brand-main h-11 text-sm rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="select select-bordered select-sm bg-app-bg border-border h-11 rounded-xl focus:ring-brand-main"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Blocked">Blocked Only</option>
            </select>
          </div>

          {/* Table - Fully Theme Compatible */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="table w-full border-separate border-spacing-y-0">
              <thead>
                <tr className="text-text-muted border-b border-border uppercase text-[11px] tracking-widest">
                  <th className="bg-transparent py-4">User Details</th>
                  <th className="bg-transparent py-4">Status</th>
                  <th className="bg-transparent py-4">Orders</th>
                  <th className="bg-transparent py-4">Spent</th>
                  <th className="bg-transparent py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-24 text-text-subtle">
                    <span className="loading loading-spinner text-brand-main"></span>
                  </td></tr>
                ) : filteredStats.rows.map((u) => (
                  <tr key={u._id} className="hover:bg-hover transition-colors border-b border-border">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-fade flex items-center justify-center font-bold text-brand-main border border-brand-soft">
                          {u.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-text-main">{u.name}</div>
                          <div className="text-xs text-text-muted">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 border ${
                        u.isActive 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-danger/10 text-danger border-danger/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-success' : 'bg-danger'}`}></span>
                        {u.isActive ? 'ACTIVE' : 'BLOCKED'}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-text-muted">{u.totalOrders || 0}</td>
                    <td className="py-4 font-bold text-text-main text-base">₹{(u.totalSpends || 0).toLocaleString('en-IN')}</td>
                    <td className="py-4 text-right">
                      <button className="btn btn-ghost btn-sm hover:bg-brand-soft/20 text-text-muted hover:text-brand-main rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card using your theme variables
const StatCard = ({ title, value, icon }) => (
  <div className="bg-card-bg p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between hover:border-brand-soft transition-colors group">
    <div>
      <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black mt-1 text-text-main">{value}</h3>
    </div>
    <div className="p-4 bg-muted-bg rounded-2xl group-hover:bg-brand-fade transition-colors">
      {icon}
    </div>
  </div>
);

export default UserPage;
