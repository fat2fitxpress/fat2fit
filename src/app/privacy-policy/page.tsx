import { Metadata } from 'next';
import { Box, Container, Typography, Paper } from '@mui/material';

export const metadata: Metadata = {
  title: 'Privacy Policy - Fat2Fit',
  description: 'Privacy Policy and data collection guidelines for Fat2Fit application.',
};

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom sx={{ mb: 6 }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Paper elevation={0} variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              1. Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to Fat2Fit. This Privacy Policy explains how we collect, use, and protect your personal information when you use our mobile application and website services.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              2. Data Collection
            </Typography>
            <Typography variant="body1" paragraph>
              To provide you with personalized fitness and health tracking experiences, the Fat2Fit application collects the following specific personal information during account creation:
            </Typography>
            <Typography component="div" variant="body1" sx={{ ml: 4, mb: 2 }}>
              <ul>
                <li><strong>Full Name</strong></li>
                <li><strong>Email Address</strong></li>
                <li><strong>Height</strong></li>
                <li><strong>Weight</strong></li>
                <li><strong>Sex</strong> (for accurate metabolic and physiological calculations)</li>
              </ul>
            </Typography>
            <Typography variant="body1" paragraph>
              We only collect data that is strictly necessary to calculate your metabolic needs, design your workout plans, and operate our fitness application logically.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              3. Data Security and Encryption
            </Typography>
            <Typography variant="body1" paragraph>
              Your security is our highest priority. We employ industry-standard security measures to protect your Personally Identifiable Information (PII) against unauthorized access, alteration, disclosure, or destruction.
            </Typography>
            <Typography variant="body1" color="primary.main" sx={{ fontWeight: 'bold', mb: 2 }}>
              All Personally Identifiable Information (PII), including your Full Name, Email, Height, Weight, and Sex, is rigorously encrypted using robust AES 256 encryption algorithms before being stored in our database.
            </Typography>
            <Typography variant="body1" paragraph>
              This ensures that even if absolute access to our data stores were somehow compromised, your personal health details would remain indecipherable and secure.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              4. How We Use Your Data
            </Typography>
            <Typography variant="body1" paragraph>
              The data we collect is utilized strictly within the scope of our services:
            </Typography>
            <Typography component="div" variant="body1" sx={{ ml: 4, mb: 2 }}>
              <ul>
                <li>To establish and maintain your account profile.</li>
                <li>To generate accurate basal metabolic rate (BMR) and total daily energy expenditure (TDEE) macros.</li>
                <li>To dynamically adjust and customize fitness and workout routines directly suited to your body metrics.</li>
                <li>To communicate account-related notices securely to your verified email address.</li>
              </ul>
            </Typography>
            <Typography variant="body1" paragraph>
              We do not sell or rent your personal data to any third parties for marketing purposes.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              5. User Rights to Information
            </Typography>
            <Typography variant="body1" paragraph>
              You maintain full rights to request an export of the data we hold regarding your profile. Furthermore, you may request the complete deletion of your account and associated encrypted data at any time via the account settings inside the mobile application. Once requested, your data will be permanently and securely eradicated from our system within 30 days.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              6. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions or require more information regarding our data privacy policies or data encryption practices, please contact us at contact@fat2fitxpress.com.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
