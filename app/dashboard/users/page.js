import React from "react";
import UsersList    from "@/components/user/UsersList"

export const revalidate = 3600;

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users Directory</h1>
      <UsersList />
    </div>
  );
}
