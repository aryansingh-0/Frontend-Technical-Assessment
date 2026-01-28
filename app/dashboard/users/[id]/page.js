// app/dashboard/users/[id]/page.js
import React from "react";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const BG = "#0f1111";
const CARD = "#18181b";
const BORDER = "#2d2f31";
const TEXT = "#ffffff";
const MUTED = "#a1a1aa";
const ACCENT = "#e53935";

export const revalidate = 3600;

export default async function Page({ params }) {
  const { id } =await params;

  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return (
      <Box
        bgcolor={BG}
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={TEXT}
      >
        User not found
      </Box>
    );
  }

  const user = await res.json();

  return (
    <Box bgcolor={BG} minHeight="100vh" p={{ xs: 2, md: 4 }}>
      {/* Back */}
      <Link href="/dashboard/users">
        <Button
          startIcon={<FaArrowLeft />}
          sx={{
            mb: 3,
            bgcolor: ACCENT,
            color: TEXT,
            textTransform: "none",
            "&:hover": { bgcolor: "#d32f2f" },
          }}
        >
          Back to Users
        </Button>
      </Link>

      {/* Header */}
      <Card sx={{ bgcolor: CARD, mb: 4, p: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
        >
          <Avatar
            src={user.image}
            alt={user.username}
            sx={{ width: 120, height: 120, bgcolor: ACCENT }}
          />
          <Box>
            <Typography color={TEXT} variant="h4" fontWeight={600}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={MUTED} mb={1}>
              @{user.username}
            </Typography>
            <Typography color={TEXT}>{user.email}</Typography>
          </Box>
        </Stack>
      </Card>

      <Grid container spacing={3}>
        {/* Personal Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: CARD, p: 3 }}>
            <Typography color={TEXT} variant="h6" mb={1}>
              Personal Information
            </Typography>
            <Divider sx={{ borderColor: BORDER, mb: 2 }} />

            <Typography color={TEXT}>Gender: {user.gender}</Typography>
            <Typography color={TEXT}>Age: {user.age}</Typography>
            <Typography color={TEXT}>Blood Group: {user.bloodGroup}</Typography>
            <Typography color={TEXT}>
              Height: {user.height} cm · Weight: {user.weight} kg
            </Typography>
            <Typography color={TEXT}>Eye Color: {user.eyeColor}</Typography>
            <Typography color={TEXT}>
              Hair: {user.hair.color} ({user.hair.type})
            </Typography>
          </Card>
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: CARD, p: 3 }}>
            <Typography color={TEXT} variant="h6" mb={1}>
              Address & Network
            </Typography>
            <Divider sx={{ borderColor: BORDER, mb: 2 }} />

            <Typography color={TEXT}>{user.address.address}</Typography>
            <Typography color={TEXT}>
              {user.address.city}, {user.address.state}{" "}
              {user.address.postalCode}
            </Typography>
            <Typography color={TEXT}>
              Country: {user.address.country}
            </Typography>
            <Typography color={TEXT}>IP: {user.ip}</Typography>
            <Typography color={TEXT}>MAC: {user.macAddress}</Typography>
          </Card>
        </Grid>

        {/* Company */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: CARD, p: 3 }}>
            <Typography color={TEXT} variant="h6" mb={1}>
              Company Details
            </Typography>
            <Divider sx={{ borderColor: BORDER, mb: 2 }} />

            <Typography color={TEXT}>
              Name: {user.company.name}
            </Typography>
            <Typography color={TEXT}>
              Department: {user.company.department}
            </Typography>
            <Typography color={TEXT}>
              Title: {user.company.title}
            </Typography>
            <Typography color={TEXT}>
              Address: {user.company.address.address},{" "}
              {user.company.address.city}
            </Typography>
          </Card>
        </Grid>

        {/* Education & Bank */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: CARD, p: 3 }}>
            <Typography color={TEXT} variant="h6" mb={1}>
              Education & Bank Information
            </Typography>
            <Divider sx={{ borderColor: BORDER, mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography color={TEXT}>
                  University: {user.university}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography color={TEXT}>
                  Card: {user.bank.cardType} · {user.bank.cardNumber}
                </Typography>
                <Typography color={TEXT}>
                  Currency: {user.bank.currency}
                </Typography>
                <Typography color={TEXT}>
                  Expiry: {user.bank.cardExpire}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
