import React from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const BG = "#0f1111";
const TEXT = "#f9fafb";
const ACCENT = "#e53935";
const CARD = "#18181b";

export default function NotFoundPage() {
  return (
    <Box
      bgcolor={BG}
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={3}
      flexDirection="column"
      textAlign="center"
      color={TEXT}
    >
      <Typography variant="h3" fontWeight={700} mb={2}>
        404
      </Typography>
      <Typography variant="h6" mb={3}>
        Page not found
      </Typography>
      <Link href="/dashboard" passHref>
        <Button
          startIcon={<FaArrowLeft />}
          sx={{
            backgroundColor: ACCENT,
            color: "#fff",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Back to Dashboard
        </Button>
      </Link>
    </Box>
  );
}
