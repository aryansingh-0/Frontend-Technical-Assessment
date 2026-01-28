"use client";

import React, { useState } from "react";
import { Grid, Card, CardMedia, Box } from "@mui/material";

const CARD = "#18181b";
const BORDER = "#2d2f31";
const ACCENT = "#f08804";

export default function ProductGalleryClient({ images, thumbnail }) {
  const [activeImage, setActiveImage] = useState(thumbnail || images?.[0]);

  return (
    <Grid container spacing={2}>
      {/* Thumbnails */}
      <Grid item xs={12} md={2}>
        <Box
          display="flex"
          flexDirection={{ xs: "row", md: "column" }}
          gap={1}
          overflow="auto"
        >
          {images?.map((img, i) => (
            <Box
              key={i}
              onClick={() => setActiveImage(img)}
              onMouseEnter={() => setActiveImage(img)}
              sx={{
                border: activeImage === img ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                cursor: "pointer",
                p: 0.5,
                bgcolor: CARD,
                flexShrink: 0,
                borderRadius: 1,
              }}
            >
              <img
                src={img}
                alt=""
                style={{ width: 60, height: 60, objectFit: "contain" }}
              />
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Main Image */}
      <Grid item xs={12} md={10}>
        <Card sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: 2 }}>
          <CardMedia
            component="img"
            image={activeImage}
            alt="Product Image"
            sx={{ width: "100%", height: { xs: 300, sm: 400, md: 420 }, objectFit: "contain" }}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
