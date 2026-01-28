export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-20 h-20 bg-gray-700 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-gray-700 rounded" />
          <div className="h-4 w-1/2 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Content Sections */}
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="space-y-2 animate-pulse">
          <div className="h-5 w-48 bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-600 rounded" />
          <div className="h-4 w-5/6 bg-gray-600 rounded" />
          <div className="h-4 w-4/6 bg-gray-600 rounded" />
        </div>
      ))}

      {/* Optional horizontal loading bars at bottom */}
      <div className="space-y-2 mt-4 animate-pulse">
        <div className="h-2 w-full bg-gray-700 rounded" />
        <div className="h-2 w-5/6 bg-gray-700 rounded" />
        <div className="h-2 w-3/4 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
