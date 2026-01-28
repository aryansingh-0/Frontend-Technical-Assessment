import React from "react";

function UserLoading() {
  // Create an array of 6 items to render skeletons
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse py-4">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border p-4 rounded bg-gray-100 dark:bg-gray-800"
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />

          {/* Text placeholder */}
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserLoading;
