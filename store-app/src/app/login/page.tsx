"use client";

import { login } from "@/services/admin.service";
import { userAtom } from "@/storage/user.storage";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";

export default function Login() {
  const [userToken, setUserToken] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    setUserToken(null);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newLogin = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    const response = await login(newLogin.email, newLogin.password);
    setUserToken(response.authorisation.token);
    router.push("/");
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 0.5 }}
          >
            Entrar
          </Button>
          <Link href="/register" passHref>
            <Button fullWidth variant="contained" sx={{ mt: 0.5, mb: 2 }}>
              Registrar
            </Button>
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
