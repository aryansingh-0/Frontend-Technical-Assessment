"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button, Box, Typography, Stack } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

const BG = "#0f0f0f";
const CARD = "#18181b";
const TEXT = "#f9fafb";
const ACCENT = "#f08804";
const ERROR = "#e53935";

export default function Dashboard() {
  const username = useAuthStore((state) => state.username);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: BG,
        color: TEXT,
        p: { xs: 4, md: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Welcome */}
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome back, {username || "Admin"}!
        </Typography>
        <Typography fontSize={16} color="#aaa">
          Manage your users and products efficiently.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
        <Button
          variant="contained"
          component={Link}
          href="/dashboard/users"
          sx={{
            minWidth: 160,
            bgcolor: "#1976d2",
            color: TEXT,
            fontWeight: 600,
            py: 1.5,
            "&:hover": { bgcolor: "#1565c0" },
            transition: "all 0.2s",
          }}
        >
          Users
        </Button>

        <Button
          variant="contained"
          component={Link}
          href="/dashboard/products"
          sx={{
            minWidth: 160,
            bgcolor: ACCENT,
            color: BG,
            fontWeight: 600,
            py: 1.5,
            "&:hover": { bgcolor: "#ffb84c" },
            transition: "all 0.2s",
          }}
        >
          Products
        </Button>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            minWidth: 160,
            bgcolor: ERROR,
            color: TEXT,
            fontWeight: 600,
            py: 1.5,
            "&:hover": { bgcolor: "#d32f2f" },
            transition: "all 0.2s",
          }}
        >
          Logout
        </Button>
      </Stack>

      {/* Quick Info Card */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          bgcolor: CARD,
          borderRadius: 2,
          minWidth: 300,
          textAlign: "center",
          boxShadow: 4,
        }}
      >
        <Typography variant="h6" mb={1} color={ACCENT}>
          Quick Stats
        </Typography>
        <Typography fontSize={14} color="#aaa">
          You can quickly navigate to Users and Products pages, or log out safely.
        </Typography>
      </Box>
    </Box>
  );
}
