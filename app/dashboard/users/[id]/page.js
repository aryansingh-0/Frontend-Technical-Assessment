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
const TEXT = "#ffffff"; // main text
const MUTED = "#a1a1aa"; // secondary text
const ACCENT = "#e53935";

// ISR: revalidate every 1 hour
export const revalidate = 3600;

export default async function Page({ params }) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return (
      <Box
        bgcolor={BG}
        minHeight="100vh"
        color={TEXT}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={18}
      >
        User not found
      </Box>
    );
  }

  const user = await res.json();

  return (
    <Box bgcolor={BG} minHeight="100vh" p={{ xs: 2, md: 4 }} color={TEXT}>
      {/* Back Button */}
      <Link href="/dashboard/users">
        <Button
          startIcon={<FaArrowLeft />}
          sx={{
            mb: 4,
            backgroundColor: ACCENT,
            color: TEXT,
            "&:hover": { backgroundColor: "#d32f2f" },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Users
        </Button>
      </Link>

      <Grid container spacing={4}>
        {/* Basic Info */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: CARD,
              p: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: 4,
            }}
          >
            <CardContent sx={{ color: TEXT }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Avatar
                  src={user.image}
                  alt={user.username}
                  sx={{ width: 100, height: 100, bgcolor: ACCENT }}
                />
                <Box textAlign={{ xs: "center", md: "left" }}>
                  <Typography color={TEXT}
                    variant="h5"
                    fontWeight={600} 
                    mb={1}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography   color={MUTED} mb={1}>
                    @{user.username}
                  </Typography>
                  <Typography color={TEXT}
                    sx={{
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      maxWidth: "100%",
                      mb: 1,
                    }}
                  >
                    {user.email}
                  </Typography>
                  <Typography  mb={0.5} color={TEXT}>
                    {user.gender}, {user.age} years
                  </Typography>
                  <Typography  mb={0.5} color={TEXT}>
                    Blood Group: {user.bloodGroup}
                  </Typography>
                  <Typography   mb={0.5} color={TEXT}>
                    Height: {user.height} cm · Weight: {user.weight} kg
                  </Typography>
                  <Typography   mb={0.5} color={TEXT}>
                    Eye Color: {user.eyeColor}
                  </Typography>
                  <Typography  color={TEXT}>
                    Hair: {user.hair.color} ({user.hair.type})
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: CARD,
              p: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography color={TEXT} variant="h6" mb={1}         >
                Address
              </Typography>
              <Divider sx={{ mb: 2, borderColor: BORDER }} />
              <Typography color={TEXT} mb={0.5}>{user.address.address}</Typography>
              <Typography color={TEXT} mb={0.5}>
                {user.address.city}, {user.address.state} {user.address.postalCode}
              </Typography>
              <Typography color={TEXT} mb={0.5}>Country: {user.address.country}</Typography>
              <Typography color={TEXT} mb={0.5}>IP: {user.ip}</Typography>
              <Typography color={TEXT}>MAC: {user.macAddress}</Typography>
            </CardContent>
          </Card>

          {/* Company */}
          <Card
            sx={{
              bgcolor: CARD,
              p: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography color={TEXT} variant="h6" mb={1}  >
                Company
              </Typography>
              <Divider sx={{ mb: 2, borderColor: BORDER }} />
              <Typography color={TEXT} mb={0.5}>
                <b>Name:</b> {user.company.name}
              </Typography>
              <Typography color={TEXT} mb={0.5}>
                <b>Department:</b> {user.company.department}
              </Typography>
              <Typography color={TEXT} mb={0.5}>
                <b>Title:</b> {user.company.title}
              </Typography>
              <Typography color={TEXT}>
                <b>Address:</b> {user.company.address.address}, {user.company.address.city},{" "}
                {user.company.address.state} {user.company.address.postalCode}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* University & Bank */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: CARD,
              p: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography   variant="h6" mb={1} color={TEXT}>
                University & Bank
              </Typography>
              <Divider sx={{ mb: 2, borderColor: BORDER }} />
              <Typography color={TEXT}   mb={0.5}>University: {user.university}</Typography>
              <Typography color={TEXT}   mb={0.5}>Card Number: {user.bank.cardNumber}</Typography>
              <Typography color={TEXT} mb={0.5}>Card Type: {user.bank.cardType}</Typography>
              <Typography color={TEXT} mb={0.5}>Currency: {user.bank.currency}</Typography>
              <Typography color={TEXT} mb={0.5}>IBAN: {user.bank.iban}</Typography>
              <Typography color={TEXT}>Card Expiry: {user.bank.cardExpire}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
