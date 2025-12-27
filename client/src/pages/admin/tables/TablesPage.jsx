import { getAllTables } from "@/redux/admin/tableSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "@/components/admin/tables/TableSkeleton";
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
        <table className="table text-text-main">
          {console.log(tables)}
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
                  <td>{table.qrSlug}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        table.isActive
                          ? "bg-green-500/10 text-green-500 animate-pulse"

                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {table.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>{table.capacity}</td>
                  <td>
                    <a
                      href={table.qrImage}
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
      <div className="flex justify-end mt-2">
        <button className="btn text-text-main bg-card-bg">Add More</button>
      </div>
    </>
  );
};

export default TablesPage;
