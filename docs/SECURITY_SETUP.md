# 🔐 Security Setup Guide

## ⚠️ **IMPORTANT: Before pushing to GitHub**

This project contains sensitive configuration that should **NEVER** be committed to version control.

## 🚀 **Quick Setup**

### 1. **Create your `.env` file**

```bash
# Copy the example file
cp env.example .env

# Edit the .env file with your secure credentials
nano .env
```

### 2. **Update your `.env` file with secure values**

```env
# Server Configuration
NODE_ENV=development
PORT=3005

# Security
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
BCRYPT_ROUNDS=12

# Database Configuration
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}

# PostgreSQL Credentials (for Docker)
POSTGRES_DB=yellowbear_store
POSTGRES_USER=yellowbear
POSTGRES_PASSWORD=your-secure-password-here  # ← CHANGE THIS!

# External APIs (if needed)
# STRIPE_SECRET_KEY=sk_test_...
# SENDGRID_API_KEY=SG...
```

## 🔑 **Generate Secure Passwords**

### **Option 1: Using OpenSSL**

```bash
# Generate a 32-character random password
openssl rand -base64 32
```

### **Option 2: Using Node.js**

```bash
# Generate a random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Option 3: Online Generator**

- Use a secure password generator like [1Password](https://1password.com/) or [LastPass](https://www.lastpass.com/)

## 🛡️ **Security Best Practices**

### ✅ **DO:**

- Use strong, unique passwords (at least 16 characters)
- Use different passwords for different environments
- Rotate passwords regularly
- Use environment variables for all sensitive data
- Keep your `.env` file local and never commit it

### ❌ **DON'T:**

- Use default passwords
- Use the same password across projects
- Commit `.env` files to version control
- Share credentials in chat or email
- Use simple passwords like "password123"

## 🔍 **Verify Your Setup**

### **Check if .env is ignored:**

```bash
git status
# Should NOT show .env in the output
```

### **Test your database connection:**

```bash
make docker-compose-dev-up
curl http://localhost:3005/api/health
```

## 🚨 **If You Accidentally Committed Secrets**

### **Immediate Actions:**

1. **Change all passwords immediately**
2. **Revoke any API keys**
3. **Check your git history for exposed secrets**

### **Clean Git History:**

```bash
# Remove .env from git history (if accidentally committed)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push to remove from remote
git push origin --force --all
```

## 🔧 **Production Deployment**

For production, use:

- **Environment variables** in your hosting platform
- **Secrets management** services (AWS Secrets Manager, Azure Key Vault, etc.)
- **Docker secrets** for containerized deployments
- **Never** use the same credentials as development

## 📞 **Need Help?**

If you have security concerns or questions:

1. Check the [GitHub Security Best Practices](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure)
2. Review [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
3. Contact your security team

---

**Remember: Security is everyone's responsibility! 🔐**
