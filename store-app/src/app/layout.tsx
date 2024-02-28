import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store App",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>{props.children}</AppRouterCacheProvider>
    </html>
  );
}
