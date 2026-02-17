# GitHub Secrets Setup Guide

This guide explains how to configure GitHub Secrets for secure deployment of your Fat2Fit website.

## Why GitHub Secrets?

Your EmailJS API keys and Google Analytics ID need to be available during the build process, but you don't want to commit them directly to your repository. GitHub Secrets allow you to securely store these values and inject them during the GitHub Actions build.

## Important Note About `NEXT_PUBLIC_` Variables

⚠️ **Variables prefixed with `NEXT_PUBLIC_` will be embedded in the client-side JavaScript bundle.** This is intentional and required for client-side functionality like EmailJS.

**This is NOT a security issue** because:
- EmailJS is designed to work this way (client-side email service)
- Real security comes from EmailJS dashboard settings (see below)
- The alternative would be building a backend API, which is overkill for a contact form

## Step 1: Add Secrets to GitHub Repository

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/YOUR_REPO`
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** button
5. Add each of the following secrets:

### Required Secrets

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `NEXT_PUBLIC_GA_ID` | Your Google Analytics ID | https://analytics.google.com |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Your EmailJS Service ID | https://dashboard.emailjs.com/admin |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID | https://dashboard.emailjs.com/admin/templates |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key | https://dashboard.emailjs.com/admin/account |

### Example Values (from your current setup)

```
NEXT_PUBLIC_GA_ID = G-7ESEHJS3GP
NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_fat2fitxpress
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_vktaim6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = k5thKtxmZQo4Cd-oF
```

## Step 2: Secure Your EmailJS Account

Since these keys will be visible in the client bundle, you MUST configure EmailJS security settings:

### A. Enable Domain Restrictions
1. Log in to https://dashboard.emailjs.com/admin
2. Go to **Account** tab
3. Find **Allowed Domains** section
4. Add your domain: `fat2fitxpress.com`
5. Remove `*` (wildcard) if present
6. Save changes

This ensures only requests from your domain can use your EmailJS service.

### B. Enable reCAPTCHA (Recommended)
1. In EmailJS dashboard, go to **Security** settings
2. Enable **reCAPTCHA v3** protection
3. This adds an extra layer of bot protection

### C. Set Rate Limits (Recommended)
1. In EmailJS dashboard, check your plan's rate limits
2. Consider upgrading if you expect high traffic
3. Monitor usage regularly

## Step 3: Verify GitHub Actions Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) has been updated to read these secrets during the build process:

```yaml
- name: Build with Next.js
  env:
    NEXT_PUBLIC_GA_ID: ${{ secrets.NEXT_PUBLIC_GA_ID }}
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_SERVICE_ID }}
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID }}
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }}
  run: ${{ steps.detect-package-manager.outputs.runner }} next build
```

## Step 4: Test the Deployment

1. **Commit and push** your changes to GitHub
2. **Go to Actions tab** in your GitHub repository
3. **Watch the build** process
4. **Check for errors** - if secrets are missing, the build will warn you
5. **Test the contact form** after deployment to ensure it works

## Local Development

For local development, use the `.env.local` file (already configured):

```bash
# This file is git-ignored and safe to use locally
NEXT_PUBLIC_GA_ID=G-7ESEHJS3GP
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_fat2fitxpress
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_vktaim6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=k5thKtxmZQo4Cd-oF
```

Run locally:
```bash
npm run dev
```

## Troubleshooting

### Build fails with "EmailJS environment variables are not configured"
- **Solution**: Verify all 4 secrets are added to GitHub repository settings with exact names

### Contact form doesn't work after deployment
- **Solution**: Check EmailJS domain restrictions - ensure `fat2fitxpress.com` is allowed

### Getting "403 Forbidden" from EmailJS
- **Solution**: Your domain is not in the allowed list. Add it in EmailJS dashboard.

### Variables not updating after adding secrets
- **Solution**: Re-run the GitHub Action or push a new commit to trigger a fresh build

## Security Checklist

✅ GitHub Secrets configured for all 4 environment variables  
✅ `.env.local` file is git-ignored (verify with `git status`)  
✅ EmailJS domain restrictions enabled for `fat2fitxpress.com`  
✅ EmailJS reCAPTCHA protection enabled (recommended)  
✅ Rate limits configured in EmailJS  
✅ No hardcoded API keys in source code  
✅ Security headers configured in `next.config.ts`  

## Additional Resources

- [GitHub Actions Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [EmailJS Security Best Practices](https://www.emailjs.com/docs/security/)
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
