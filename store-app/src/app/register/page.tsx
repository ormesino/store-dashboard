"use client";

import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function Register() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="name"
            margin="normal"
            required
            fullWidth
            id="name"
            autoComplete="name"
            label="Nome"
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="email"
            margin="normal"
            autoComplete="email"
            label="Email"
            name="email"
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Senha"
            margin="normal"
            autoComplete="password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Criar Conta
          </Button>
          <Link href="/login" variant="body2" align="center">
            <Typography>Já possui uma conta? Faça o login</Typography>
          </Link>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        {new Date().getFullYear()}
      </Typography>
    </Container>
  );
}
