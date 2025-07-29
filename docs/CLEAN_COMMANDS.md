# 🧹 Clean Commands Guide

This guide explains the different cleaning commands available in the Makefile and when to use each one.

## 🚀 **Available Commands**

### **1. `make fresh-start` - Complete Clean Rebuild**

**Use when:** You want to start completely fresh with no cached data, containers, or dependencies.

**What it does:**

- ✅ Stops all containers
- ✅ Removes all Docker containers, volumes, images, and networks
- ✅ Clears all Docker build cache
- ✅ Removes local `node_modules` and `package-lock.json`
- ✅ Reinstalls all dependencies from scratch
- ✅ Regenerates Prisma client
- ✅ Builds and starts fresh containers

**When to use:**

- 🔄 After major dependency changes
- 🐛 When troubleshooting persistent issues
- 🧪 When you want to test the complete setup process
- 🚀 Before important demos or deployments

```bash
make fresh-start
```

---

### **2. `make clean-docker` - Docker Resources Only**

**Use when:** You want to clean Docker resources but keep your local dependencies.

**What it does:**

- ✅ Stops all containers
- ✅ Removes all Docker containers, volumes, images, and networks
- ✅ Clears all Docker build cache
- ❌ Keeps local `node_modules` and dependencies

**When to use:**

- 🐳 When Docker containers are misbehaving
- 💾 When you want to free up disk space
- 🔄 When switching between different Docker configurations
- 🧪 When testing Docker setup without affecting local files

```bash
make clean-docker
```

---

### **3. `make clean-local` - Local Files Only**

**Use when:** You want to clean local dependencies but keep Docker resources.

**What it does:**

- ✅ Removes local `node_modules` and `package-lock.json`
- ✅ Reinstalls all dependencies from scratch
- ✅ Regenerates Prisma client
- ❌ Keeps all Docker containers and images

**When to use:**

- 📦 When `node_modules` is corrupted
- 🔄 After updating `package.json`
- 🐛 When local dependencies are causing issues
- 🧪 When you want to test dependency installation

```bash
make clean-local
```

---

### **4. `make docker-compose-dev-down` - Quick Stop**

**Use when:** You just want to stop the development environment.

**What it does:**

- ✅ Stops and removes containers
- ❌ Keeps volumes (data persists)
- ❌ Keeps images and cache

**When to use:**

- ⏸️ When taking a break from development
- 🔄 When switching between projects
- 💾 When you want to save resources

```bash
make docker-compose-dev-down
```

---

## 🎯 **Quick Decision Guide**

| Situation                | Command                        |
| ------------------------ | ------------------------------ |
| **Complete fresh start** | `make fresh-start`             |
| **Docker issues**        | `make clean-docker`            |
| **Dependency issues**    | `make clean-local`             |
| **Just stop containers** | `make docker-compose-dev-down` |
| **Database issues**      | `make db-reset`                |

## ⚠️ **Important Notes**

### **Data Loss Warning:**

- `fresh-start` and `clean-docker` will **delete all database data**
- Use `make db-seed` after cleaning to restore test data
- Backup important data before running these commands

### **Time Considerations:**

- `fresh-start`: ~5-10 minutes (complete rebuild)
- `clean-docker`: ~2-3 minutes (Docker cleanup)
- `clean-local`: ~2-3 minutes (dependency reinstall)

### **Network Requirements:**

- All commands require internet connection for:
  - Downloading Docker images
  - Installing npm packages
  - Generating Prisma client

## 🔧 **Troubleshooting**

### **If `fresh-start` fails:**

1. Check internet connection
2. Ensure Docker Desktop is running
3. Try running commands individually:
   ```bash
   make clean-docker
   make clean-local
   make docker-compose-dev-up
   ```

### **If Docker commands fail:**

1. Restart Docker Desktop
2. Check available disk space
3. Try manual cleanup:
   ```bash
   docker system prune -a --volumes
   ```

### **If npm install fails:**

1. Clear npm cache: `npm cache clean --force`
2. Check Node.js version compatibility
3. Try using yarn instead: `yarn install`

---

**Remember: When in doubt, use `make fresh-start` for a completely clean environment! 🚀**
