"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { FiBox, FiUsers, FiMoon } from "react-icons/fi";

const BG = "#0f0f0f";
const CARD = "#18181b";
const TEXT = "#f9fafb";
const MUTED = "#a1a1aa";
const ACCENT = "#f08804";

export default function Home() {
  return (
    <Box bgcolor={BG} minHeight="100vh" px={{ xs: 2, md: 6 }} py={12} color={TEXT} display="flex" flexDirection="column" alignItems="center" gap={16}>
      {/* Hero Section */}
      <Box textAlign="center" maxWidth={720} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h3" md={{ fontSize: 48 }} fontWeight="bold">
          Study Helper Dashboard
        </Typography>
        <Typography fontSize={18} color={MUTED}>
          Manage users and products seamlessly. Search, filter, and paginate—all in one dark-themed admin panel.
        </Typography>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3} justifyContent="center">
          <Link href="/dashboard/products" passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: ACCENT,
                color: BG,
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#ffb84c" },
              }}
            >
              View Products
            </Button>
          </Link>

          <Link href="/dashboard/users" passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e53935",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
            >
              View Users
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} maxWidth={1200}>
        {[
          {
            icon: <FiBox size={40} className="text-yellow-400" />,
            title: "Products List",
            desc: "Browse all products with images, prices, categories, and ratings. Supports search, category filter, and pagination.",
          },
          {
            icon: <FiUsers size={40} className="text-blue-400" />,
            title: "Users Management",
            desc: "Manage users efficiently. View profile details, search users, and paginate through large lists seamlessly.",
          },
          {
            icon: <FiMoon size={40} className="text-purple-400" />,
            title: "Dark Theme & UI",
            desc: "Fully dark-themed interface built with MUI and Tailwind. Smooth animations and responsive design for desktop and mobile.",
          },
        ].map((feature, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ bgcolor: CARD, p: 3, borderRadius: 2, minHeight: 240, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, "&:hover": { boxShadow: 6 } }}>
              {feature.icon}
              <Typography variant="h6" className="text-white" fontWeight={600} textAlign="center">
                {feature.title}
              </Typography>
              <Typography fontSize={14} color={MUTED} textAlign="center">
                {feature.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How It Works Section */}
      <Box maxWidth={800} textAlign="center" display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4" fontWeight={600}>
          How It Works
        </Typography>
        <Typography fontSize={14} color={MUTED} lineHeight={1.8}>
          - Products and users are fetched from APIs and cached in Zustand store for fast performance.<br />
          - Search, category filter, and pagination work together without unnecessary network calls.<br />
          - Admin login is protected with NextAuth credentials.<br />
          - Each product and user has a detailed page with ISR for fast loading and SEO.
        </Typography>
      </Box>

      {/* Footer */}
      
    </Box>
  );
}
