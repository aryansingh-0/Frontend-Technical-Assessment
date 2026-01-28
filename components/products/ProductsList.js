"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"; // icon for View Details
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useProductsStore } from "@/store/productsStore";

const ProductCard = React.memo(({ product }) => (
  <Grid item xs={12} sm={6} lg={4}>
  <Card
    sx={{
      height: "100%",
      width: "100%",
      backgroundColor: "#282828",
      color: "#fff",
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
    }}
  >
    <CardMedia
      component="img"
      alt={product.title}
      height="180"
      image={product.thumbnail}
      sx={{ objectFit: "contain", bgcolor: "#1f1f1f" }}
    />
    <CardContent>
      <Typography variant="h6" noWrap>
        {product.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#bbb", mt: 0.5 }}>
        ${product.price} · {product.category}
      </Typography>
    </CardContent>

    {/* View Details Button */}
    <Box sx={{ p: 2, pt: 0 }}>
      <Link href={`/dashboard/products/${product.id}`} passHref>
        <Button
          variant="contained"
          endIcon={<FaArrowRight />}
          fullWidth
          sx={{
            bgcolor: "#fff9",
            color: "#000000",
            "&:hover": { bgcolor: "#d32f2f" },
            py: 1,
          }}
        >
          View Details
        </Button>
      </Link>
    </Box>
  </Card>
</Grid>
));

export default function ProductsList() {
  const { productsCache, total, categories, loading, fetchCategories, fetchProducts } =
    useProductsStore();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;

  const key = `${query}-${category}-${page}`;
  const products = productsCache[key] || [];

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  // Load categories once
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch products whenever query, category, or page changes
  useEffect(() => {
    fetchProducts({ limit, skip: page * limit, query, category });
  }, [query, category, page, fetchProducts]);

  return (
    <Box className="min-h-screen md:p-6 text-white">
      {/* Controls */}
      <Box className="flex  flex-col md:flex-row gap-3 md:gap-4 mb-6">
        <TextField
          label="Search products"
          value={query}
          className="bg-white/80 rounded-md"
          onChange={(e) => {
            setQuery(e.target.value);
            setCategory("");
            setPage(0);
          }}
          fullWidth
        />
        <FormControl className="bg-white/80 rounded-md" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select

            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setQuery("");
              setPage(0);
            }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Loading */}
      {loading && !products.length && (
        <Box className="flex justify-center py-10">
          <CircularProgress />
        </Box>
      )}

      {/* Products Grid */}
      <Grid container justifyContent={"space-evenly"} spacing={3}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Grid>

      {/* Pagination */}
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


    </Box>
  );
}
