import React from "react";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-box border border-border bg-app-bg">
      <table className="table text-text-main">
        <thead>
          <tr>
            <th>#</th>
            <th>Table Number</th>
            <th>Table Slug</th>
            <th>Status</th>
            <th>Capacity</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4].map((i) => (
            <tr key={i}>
              <td>
                <div className="skeleton h-4 w-6"></div>
              </td>
              <td>
                <div className="skeleton h-4 w-24"></div>
              </td>
              <td>
                <div className="skeleton h-4 w-32"></div>
              </td>
              <td>
                <div className="skeleton h-4 w-16"></div>
              </td>
              <td>
                <div className="skeleton h-4 w-12"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
