import * as React from 'react';
import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Box from '@mui/material/Box';

export const metadata: Metadata = {
  title: 'Fat2Fit - Your Express Journey to Fitness',
  description: 'Fat2Fit is your ultimate guide to fitness, diet, and healthy living.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, minHeight: '80vh' }}>
            {children}
          </Box>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
