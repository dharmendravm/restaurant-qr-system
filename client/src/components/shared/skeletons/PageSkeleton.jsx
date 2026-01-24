import React from "react";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-app-bg p-6 flex flex-col gap-6 animate-pulse">
      {/* Navbar Placeholder */}
      <div className="h-16 w-full bg-muted-bg rounded-xl mb-4"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Header Section */}
        <div className="space-y-3">
          <div className="h-8 w-48 bg-brand-soft rounded-lg"></div>
          <div className="h-4 w-72 bg-muted-bg rounded-lg"></div>
        </div>

        {/* Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card-bg border border-border p-4 rounded-2xl space-y-4">
              <div className="h-40 w-full bg-muted-bg rounded-xl"></div>
              <div className="h-6 w-3/4 bg-muted-bg rounded-lg"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 w-20 bg-brand-fade rounded-md"></div>
                <div className="h-10 w-24 bg-brand-main/20 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;