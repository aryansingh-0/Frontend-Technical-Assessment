"use client";

import React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const username = useAuthStore((state) => state.username);
  const firstName = useAuthStore((state) => state.firstName);
  const image = useAuthStore((state) => state.image);

  const [profileAnchor, setProfileAnchor] = React.useState(null);
  const [mobileAnchor, setMobileAnchor] = React.useState(null);

  const isProfileOpen = Boolean(profileAnchor);
  const isMobileOpen = Boolean(mobileAnchor);

  const handleProfileOpen = (event) => setProfileAnchor(event.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);

  const handleMobileOpen = (event) => setMobileAnchor(event.currentTarget);
  const handleMobileClose = () => setMobileAnchor(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    handleProfileClose();
    handleMobileClose();
  };

  return (
   <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#0f0f0f", borderBottom: "1px solid #1f1f1f" }}>
  <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
    {/* Logo */}
    <Typography
      component={Link}
      href="/dashboard"
      variant="h6"
      fontWeight={700}
      sx={{ color: "#ffffff", textDecoration: "none", letterSpacing: 0.5, "& span": { color: "#e53935" } }}
    >
      Study<span>Helper</span>
    </Typography>

    {/* Desktop Navigation */}
    <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
      <Button component={Link} href="/dashboard/users" sx={{ color: "#e0e0e0", textTransform: "none", fontWeight: 500, "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}>
        Users
      </Button>
      <Button component={Link} href="/dashboard/products" sx={{ color: "#e0e0e0", textTransform: "none", fontWeight: 500, "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}>
        Products
      </Button>

      {/* Profile Avatar (Desktop) */}
      <IconButton onClick={handleProfileOpen}>
        <Avatar src={image || ""} alt={firstName || "User"} sx={{ width: 36, height: 36, bgcolor: "#e53935", fontWeight: 600 }}>
          {!image && firstName ? firstName[0] : ""}
        </Avatar>
      </IconButton>
    </Stack>

    {/* Mobile Hamburger */}
    <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
      <IconButton onClick={handleMobileOpen} sx={{ color: "#fff" }}>
        <MenuIcon />
      </IconButton>

      {/* Profile Avatar (Mobile) */}
      <IconButton onClick={handleProfileOpen}>
        <Avatar src={image || ""} alt={firstName || "User"} sx={{ width: 36, height: 36, bgcolor: "#e53935", fontWeight: 600 }}>
          {!image && firstName ? firstName[0] : ""}
        </Avatar>
      </IconButton>
    </Box>

    {/* Profile Menu */}
    <Menu anchorEl={profileAnchor} open={isProfileOpen} onClose={handleProfileClose} PaperProps={{ sx: { bgcolor: "#333333", color: "#fff", minWidth: 200, mt: 1, px: 1, py: 1 } }}>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography fontWeight={600} sx={{ fontSize: 16 }}>
          {firstName || "User"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          {username || "user@studyhelper"}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#1f1f1f", my: 0.5 }} />
      <MenuItem onClick={handleLogout} sx={{ color: "#e53935", fontWeight: 500, borderRadius: 1, "&:hover": { bgcolor: "rgba(229,57,53,0.15)" } }}>
        Logout
      </MenuItem>
    </Menu>

    {/* Mobile Menu */}
    <Menu anchorEl={mobileAnchor} open={isMobileOpen} onClose={handleMobileClose} PaperProps={{ sx: { bgcolor: "#333333", color: "#fff", minWidth: 180, mt: 1, px: 1, py: 1 } }}>
      <MenuItem component={Link} href="/dashboard/users" onClick={handleMobileClose}>
        Users
      </MenuItem>
      <MenuItem component={Link} href="/dashboard/products" onClick={handleMobileClose}>
        Products
      </MenuItem>
    </Menu>
  </Toolbar>
</AppBar>

  );
}
