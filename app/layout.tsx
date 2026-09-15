import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nithishkumar | MERN Stack Developer & Visual Artist",
  description:
    "Portfolio of Nithishkumar — MERN Stack Developer, Photographer, and Cinematographer based in Tamil Nadu, India. Developer by code, storyteller by lens.",
  keywords: [
    "MERN Stack Developer",
    "React Developer",
    "Photographer",
    "Cinematographer",
    "Tamil Nadu",
    "Portfolio",
    "Nithishkumar",
  ],
  authors: [{ name: "Nithishkumar" }],
  openGraph: {
    title: "Nithishkumar | MERN Stack Developer & Visual Artist",
    description:
      "Developer by code, storyteller by lens. Explore my tech projects and creative works.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ overflowX: "hidden", width: "100%" }}>{children}</body>
    </html>
  );
}
