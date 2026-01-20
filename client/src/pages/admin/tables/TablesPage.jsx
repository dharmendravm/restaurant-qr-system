import {
  getAllTables,
  toggleTableStatus,
} from "@/store/admin/tableSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { Download } from "lucide-react";

const TablesPage = () => {
  const dispatch = useDispatch();

  const { tables, loading, error } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch(getAllTables());
  }, [dispatch]);

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-box border border-border bg-app-bg text-text-muted">
        <div className="hidden md:block overflow-x-auto rounded-box border border-border bg-app-bg">
          <table className="table text-text-main">
            <thead className="text-text-main">
              <tr className="border border-border">
                <th>Table No</th>
                <th>Table Slug</th>
                <th>Status</th>
                <th>Capacity</th>
                <th>Download Qr</th>
              </tr>
            </thead>

            <tbody>
              {tables.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No tables found
                  </td>
                </tr>
              ) : (
                tables.map((table) => (
                  <tr key={table._id}>
                    <td>{table.tableNumber}</td>
                    <td className="font-mono text-xs">
                      <span
                        className=" inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[11px] font-medium bg-hover text-text-muted border border-border cursor-pointer hover:bg-brand-fade hover:text-(--color-text-main) transition-colors"
                        title={table.qrSlug}
                      >
                        {table.qrSlug}
                      </span>
                    </td>

                    <td className="px-2">
                      <input
                        type="checkbox"
                        checked={table.isActive}
                        onChange={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(toggleTableStatus(table._id));
                        }}
                        className="toggle toggle-sm bg-danger border border-danger [--tglbg:white] checked:bg-(--color-admin) checked:border-(--color-admin) transition-all duration-300 ease-out hover:scale-[1.04] active:scale-95 checked:shadow-[0_0_0_3px_rgba(34,197,94,0.25)] shadow-[0_0_0_3px_rgba(239,68,68,0.20)] "
                      />
                    </td>

                    <td>{table.capacity}</td>
                    <td>
                      <a
                        href={table.qrImage}
                        onClick={(e) => e.stopPropagation()}
                        download={`table-${table.tableNumber || "qr"}.png`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-slate-800 to-zinc-700 hover:from-slate-700 hover:to-zinc-600 text-zinc-100 text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200 active:scale-95"
                      >
                        <Download className="h-4 w-4" /> Download
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {tables.map((table) => (
          <div
            key={table._id}
            className="rounded-2xl border border-border bg-card-bg p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Table #{table.tableNumber}</h3>

              <input
                type="checkbox"
                checked={table.isActive}
                onChange={() => toggleTableStatus(table._id)}
                className="toggle toggle-sm bg-danger checked:bg-(--color-admin)"
              />
            </div>

            {/* Slug */}
            <div className="text-xs font-mono text-text-muted break-all">
              {table.qrSlug}
            </div>

            {/* Meta */}
            <div className="flex justify-between text-sm">
              <span>Capacity</span>
              <span className="font-medium">{table.capacity}</span>
            </div>

            {/* Action */}
            <a
              href={table.qrImage}
              download={`table-${table.tableNumber}.png`}
              className="inline-flex w-full justify-center items-center gap-2 px-4 py-2 rounded-xl bg-btn-black text-white text-sm"
            >
              <Download className="w-4 h-4" />
              Download QR
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-2">
        <button className="btn text-text-main bg-card-bg">Add More</button>
      </div>
    </>
  );
};

export default TablesPage;
