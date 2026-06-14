const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Stats Summary Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-48 h-6 bg-gray-200 rounded mb-6"></div>
            <div className="w-full h-[300px] bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Status Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-40 h-6 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-40 h-6 bg-gray-200 rounded mb-6"></div>
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 bg-gray-100 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
