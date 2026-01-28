import React from "react";
import Link from "next/link";
import { Box, Grid, Typography, Divider, Chip, Rating } from "@mui/material";

import ProductGalleryClient from "@/components/products/ProductGalleryClient";

const BG = "#0f1111";
const CARD = "#18181b";
const BORDER = "#2d2f31";
const TEXT = "#f9fafb";
const MUTED = "#a1a1aa";
const ACCENT = "#f08804";

export const revalidate = 3600; // ISR: 1 hour

export default async function ProductPage({ params }) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return (
      <Box bgcolor={BG} minHeight="100vh" color={TEXT} display="flex" justifyContent="center" alignItems="center">
        Product not found
      </Box>
    );
  }

  const product = await res.json();

  return (
    <Box bgcolor={BG} minHeight="100vh" p={{ xs: 2, md: 4 }} color={TEXT}>
      {/* Back button */}
      <Link href="/dashboard/products">
        <Box
          component="button"
          sx={{
            mb: 3,
            color: ACCENT,
            borderColor: ACCENT,
            border: `1px solid ${ACCENT}`,
            px: 2,
            py: 1,
            borderRadius: 1,
            background: "transparent",
            cursor: "pointer",
            "&:hover": { backgroundColor: CARD },
          }}
        >
          ← Back to Products
        </Box>
      </Link>

      {/* Top section */}
      <Grid container spacing={4}>
        {/* Left: Images */}
        <Grid item xs={12} md={5}>
          <ProductGalleryClient images={product.images} thumbnail={product.thumbnail} />
        </Grid>

        {/* Right: Product info */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight={500}>{product.title}</Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography fontSize={14} color={MUTED}>{product.rating} ratings</Typography>
          </Box>
          <Typography variant="h4" color={ACCENT} mt={1}>${product.price}</Typography>

          <Divider sx={{ my: 2, borderColor: BORDER }} />

          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Brand:</b> {product.brand}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Category:</b> {product.category}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>SKU:</b> {product.sku}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Weight:</b> {product.weight} g</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Dimensions:</b> {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} mm</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Warranty:</b> {product.warrantyInformation}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Shipping:</b> {product.shippingInformation}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Return Policy:</b> {product.returnPolicy}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Availability:</b> {product.availabilityStatus}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Minimum Order:</b> {product.minimumOrderQuantity}</Typography>
          <Typography fontSize={14} color={MUTED}><b style={{ color: TEXT }}>Barcode:</b> {product.meta.barcode}</Typography>


        </Grid>

      </Grid>

      
          <Divider sx={{ my: 2, borderColor: BORDER }} />

          <Typography variant="h6">About this item</Typography>
          <Typography fontSize={14} mt={1} lineHeight={1.6} color={MUTED}>{product.description}</Typography>

          <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
            {product.tags?.map(tag => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: CARD, color: TEXT, border: `1px solid ${BORDER}` }} />
            ))}
          </Box>

          <Divider sx={{ my: 2, borderColor: BORDER }} />

          {/* Reviews */}
          <Typography variant="h6" mt={2}>Customer Reviews</Typography>
          {product.reviews?.map((r, i) => (
            <Box key={i} sx={{ bgcolor: CARD, p: 2, mt: 1, borderRadius: 1 }}>
              <Typography fontWeight={500}>{r.reviewerName}</Typography>
              <Rating value={r.rating} readOnly size="small" />
              <Typography fontSize={14} mt={0.5} color={MUTED}>{r.comment}</Typography>
            </Box>
          ))}

          {/* QR code */}
          {product.meta?.qrCode && (
            <Box mt={3}>
              <img src={product.meta.qrCode} alt="QR Code" style={{ width: 120, height: 120 }} />
            </Box>
          )}
    </Box>
  );
}
