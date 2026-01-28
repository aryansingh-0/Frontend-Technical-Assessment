"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import UserLoading from "@/components/user/UserLoading";
import { useUsersStore } from "@/store/usersStore";

export default function UsersList() {
  const { users, total, loading, fetchUsers } = useUsersStore();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);
  const key = `${query}-${page * limit}`;

  // fetch only if store doesn't have this page/query
  useEffect(() => {
    fetchUsers({ query, limit, skip: page * limit });
  }, [query, page, fetchUsers]);

  const currentUsers = users[key] || [];

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(0); // reset page when searching
        }}
        className="border p-2 rounded w-full max-w-sm"
      />

      {/* Users */}
      {loading && !currentUsers.length ? (
        <UserLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUsers.map((user) => (
            <Link
              key={user.id}
              href={`/dashboard/users/${user.id}`}
              className="flex border p-4 rounded hover:bg-gray-800 items-center gap-4"
            >
              <img
                src={user.image}
                alt={user.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-400">{user.gender}</p>
                <p className="text-sm text-gray-400">{user.phone}</p>
                <p className="text-sm text-gray-400">{user.company?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
     {totalPages > 1 && (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={2}
    mt={4}
  >
    <Button
      variant="outlined"
      onClick={() => setPage((p) => Math.max(p - 1, 0))}
      disabled={page === 0}
      sx={{
        minWidth: 80,
        borderColor: "#555",
        color: "#fff",
        "&:hover": { borderColor: "#f08804", backgroundColor: "rgba(240,136,4,0.1)" },
        "&.Mui-disabled": { opacity: 0.5, cursor: "not-allowed", borderColor: "#555" },
      }}
    >
      Prev
    </Button>

    <Typography sx={{ color: "#fff", minWidth: 120, textAlign: "center" }}>
      Page {page + 1} of {totalPages}
    </Typography>

    <Button
      variant="outlined"
      onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
      disabled={page + 1 >= totalPages}
      sx={{
        minWidth: 80,
        borderColor: "#555",
        color: "#fff",
        "&:hover": { borderColor: "#f08804", backgroundColor: "rgba(240,136,4,0.1)" },
        "&.Mui-disabled": { opacity: 0.5, cursor: "not-allowed", borderColor: "#555" },
      }}
    >
      Next
    </Button>
  </Box>
)}

    </div>
  );
}
