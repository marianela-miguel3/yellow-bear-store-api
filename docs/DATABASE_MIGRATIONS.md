# 🗄️ Database Migrations Guide

This guide explains how to work with database migrations in the Yellow Bear Store API using Prisma ORM.

## 📋 Table of Contents

- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Migration Commands](#-migration-commands)
- [Migration Workflow](#-migration-workflow)
- [Common Scenarios](#-common-scenarios)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)

---

## 🎯 Overview

This project uses **Prisma ORM** for database management with **PostgreSQL**. Migrations allow you to:

- ✅ Track database schema changes
- ✅ Version control your database structure
- ✅ Deploy schema changes safely
- ✅ Rollback changes if needed
- ✅ Collaborate with team members

## 📋 Prerequisites

Before working with migrations, ensure you have:

- ✅ Docker containers running (`make docker-compose-dev-up`)
- ✅ Prisma client generated (`make db-generate`)
- ✅ Database connection established
- ✅ `.env` file configured with `DATABASE_URL`

---

## 🚀 Migration Commands

### **Available Make Commands**

```bash
# Generate Prisma client
make db-generate

# Push schema changes directly (development only)
make db-push

# Create and apply migrations
make db-migrate

# Deploy migrations to production
make db-migrate:deploy

# Open Prisma Studio (database GUI)
make db-studio

# Seed database with test data
make db-seed

# Reset database and apply migrations
make db-reset
```

### **Direct Prisma Commands**

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes (development)
npx prisma db push

# Create migration
npx prisma migrate dev --name <migration-name>

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

---

## 🔄 Migration Workflow

### **1. Development Workflow**

```bash
# 1. Start development environment
make docker-compose-dev-up

# 2. Make changes to prisma/schema.prisma

# 3. Create and apply migration
make db-migrate

# 4. Generate updated Prisma client
make db-generate

# 5. Test your changes
curl http://localhost:3005/api/health
```

### **2. Production Deployment**

```bash
# 1. Deploy migrations to production database
make db-migrate:deploy

# 2. Generate Prisma client for production
make db-generate

# 3. Restart your application
docker-compose restart api
```

---

## 📝 Common Scenarios

### **Scenario 1: Adding a New Model**

1. **Edit `prisma/schema.prisma`**:

   ```prisma
   model User {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     name      String?
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

2. **Create migration**:

   ```bash
   make db-migrate
   # This will prompt for migration name: "add_user_model"
   ```

3. **Verify migration**:

   ```bash
   # Check migration files
   ls prisma/migrations/

   # Test the new model
   make db-studio
   ```

### **Scenario 2: Modifying Existing Model**

1. **Edit `prisma/schema.prisma`**:

   ```prisma
   model Product {
     id          Int      @id @default(autoincrement())
     name        String
     price       Decimal  @db.Decimal(10, 2)  // Add this field
     description String?  // Add this field
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
   }
   ```

2. **Create migration**:
   ```bash
   make db-migrate
   # Migration name: "add_product_price_and_description"
   ```

### **Scenario 3: Database Reset (Development)**

```bash
# Reset database and apply all migrations
make db-reset

# This will:
# 1. Drop all tables
# 2. Apply all migrations
# 3. Run seed script (if configured)
```

---

## 🛠️ Migration Files Structure

```
prisma/
├── schema.prisma          # Database schema definition
├── migrations/            # Migration history
│   ├── 20250101120000_init/
│   │   ├── migration.sql  # SQL migration file
│   │   └── README.md      # Migration description
│   └── 20250102130000_add_user_model/
│       ├── migration.sql
│       └── README.md
└── seed.ts               # Database seeding script
```

### **Migration File Example**

```sql
-- Migration: 20250101120000_init
-- Description: Initial database setup

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "catalogId" INTEGER,
    "fullName" TEXT NOT NULL,
    "companyName" TEXT,
    "cuilCuit" TEXT,
    "address" JSONB,
    "hasReferencePrice" BOOLEAN DEFAULT false,
    "referencePriceDescription" TEXT,
    "referencePriceFileURL" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "contactInfo" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
```

---

## 🔧 Troubleshooting

### **Common Issues**

#### **1. Migration Conflicts**

```bash
# Error: Drift detected
# Solution: Reset and recreate migrations
make db-reset
make db-migrate
```

#### **2. Database Connection Issues**

```bash
# Check database connection
curl http://localhost:3005/api/health

# Restart containers
make docker-compose-dev-down
make docker-compose-dev-up
```

#### **3. Prisma Client Not Generated**

```bash
# Generate Prisma client
make db-generate

# Or manually
npx prisma generate
```

#### **4. Migration History Mismatch**

```bash
# Reset migration history
make db-reset

# Or manually
npx prisma migrate reset --force
```

### **Debug Commands**

```bash
# Check migration status
npx prisma migrate status

# View database schema
npx prisma db pull

# Validate schema
npx prisma validate

# Format schema file
npx prisma format
```

---

## 📊 Database Management

### **Prisma Studio (Database GUI)**

```bash
# Open Prisma Studio
make db-studio

# Access at: http://localhost:5555
```

**Features:**

- 📊 Visual database browser
- ✏️ Edit data directly
- 🔍 Search and filter records
- 📈 View relationships

### **Database Seeding**

```bash
# Run seed script
make db-seed

# Or manually
npx prisma db seed
```

**Seed File Location**: `prisma/seed.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create test data
  const quote = await prisma.quote.create({
    data: {
      fullName: "John Doe",
      companyName: "Test Company",
      paymentMethod: "CASH",
      // ... other fields
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 🎯 Best Practices

### **1. Migration Naming**

Use descriptive names for migrations:

```bash
# ✅ Good names
make db-migrate  # Name: "add_user_authentication"
make db-migrate  # Name: "update_product_pricing"
make db-migrate  # Name: "add_order_status_enum"

# ❌ Bad names
make db-migrate  # Name: "update"
make db-migrate  # Name: "fix"
```

### **2. Schema Changes**

- 🔄 **Always create migrations** for schema changes
- 📝 **Test migrations** in development first
- 🔍 **Review migration SQL** before applying
- 💾 **Backup production data** before migrations

### **3. Development Workflow**

```bash
# 1. Make schema changes
# 2. Create migration
make db-migrate

# 3. Test locally
make db-studio

# 4. Commit migration files
git add prisma/migrations/
git commit -m "Add user authentication migration"

# 5. Deploy to production
make db-migrate:deploy
```

### **4. Environment-Specific Commands**

| Environment     | Command                  | Purpose                  |
| --------------- | ------------------------ | ------------------------ |
| **Development** | `make db-push`           | Quick schema updates     |
| **Development** | `make db-migrate`        | Create migration history |
| **Production**  | `make db-migrate:deploy` | Apply migrations safely  |
| **Testing**     | `make db-reset`          | Clean slate for tests    |

---

## 🚨 Important Notes

### **⚠️ Data Loss Warnings**

- `make db-reset` **deletes all data**
- `make db-push` can cause data loss in some cases
- Always backup production data before migrations

### **🔒 Production Guidelines**

- ✅ Use `make db-migrate:deploy` for production
- ✅ Test migrations in staging first
- ✅ Schedule migrations during low-traffic periods
- ✅ Monitor application after migration

### **🔄 Rollback Strategy**

Prisma doesn't support automatic rollbacks, but you can:

1. **Keep backups** before migrations
2. **Create reverse migrations** manually
3. **Use database snapshots** for quick recovery

---

## 📚 Additional Resources

- **[Prisma Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)**
- **[Prisma Migration Guide](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate)**
- **[Database Schema Design](https://www.prisma.io/docs/concepts/components/prisma-schema)**

---

**💡 Tip**: Always test your migrations in a development environment before applying them to production! 🚀
