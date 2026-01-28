"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.ok) {
        const session = await getSession();
        setAuth(session.user);
        router.push("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            bgcolor: "#1e1e1e",
            p: 4,
            borderRadius: 2,
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Logo / Site Name */}
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={2}
            color="#e53935"
          >
            Study Helper
          </Typography>

          <Typography variant="h6" textAlign="center" color="gray" mb={2}>
            Admin Login
          </Typography>

          {/* Username */}
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{
              input: { color: "#fff" },
              label: { color: "gray" },
              fieldset: { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#e53935" },
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{
              input: { color: "#fff" },
              label: { color: "gray" },
              fieldset: { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#e53935" },
            }}
          />

          {/* Error message */}
          {error && (
            <Typography color="#e53935" textAlign="center" variant="body2">
              {error}
            </Typography>
          )}

          {/* Login button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            sx={{
              py: 1.5,
              mt: 1,
              fontWeight: "bold",
              backgroundColor: "#e53935",
              color: "#fff",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
          </Button>

          {/* Footer */}
          <Typography variant="body2" textAlign="center" color="gray" mt={1}>
            © 2026 Study Helper. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
