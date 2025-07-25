# Docker Development Setup Guide

## 🚀 Quick Start

Your Docker development environment is now configured for live development with real-time file watching and automatic restarts!

### Start Development Environment

```bash
make docker-compose-dev-up
```

### View Logs

```bash
make docker-compose-dev-logs
```

### Access Container Shell

```bash
make docker-compose-dev-shell
```

### Stop Development Environment

```bash
make docker-compose-dev-down
```

## ✅ What's Working

- **Live Reload**: Any changes to files in `src/` automatically restart the server
- **TypeScript**: On-the-fly TypeScript compilation with `ts-node`
- **Volume Binding**: Your local `src/` folder is mounted to `/app/src` in the container
- **Hot Reload**: `nodemon` watches for changes and restarts the server
- **Development Dependencies**: All dev dependencies (nodemon, ts-node, etc.) are installed

## 🔧 How It Works

1. **Dockerfile.dev**: Development-specific Dockerfile that installs all dependencies
2. **docker-compose.dev.yml**: Development compose file with volume binding
3. **nodemon.json**: Configuration for file watching and TypeScript execution
4. **Volume Binding**: `.:/app` mounts your entire project, `/app/node_modules` preserves container's node_modules

## 📁 File Structure

```
yellow-bear-store-api/
├── Dockerfile.dev          # Development Dockerfile
├── docker-compose.dev.yml  # Development compose file
├── nodemon.json           # Nodemon configuration
├── src/                   # Your source code (mounted to container)
└── Makefile               # Development commands
```

## 🎯 Development Workflow

1. Start the development environment: `make docker-compose-dev-up`
2. Edit files in your local `src/` directory
3. Changes are automatically detected and the server restarts
4. View logs: `make docker-compose-dev-logs`
5. Test your API at `http://localhost:3005/api/health`

## 🐛 Troubleshooting

### If nodemon isn't detecting changes:

- Check that you're editing files in the `src/` directory
- Ensure the container is running: `docker-compose -f docker-compose.dev.yml ps`
- View logs for errors: `make docker-compose-dev-logs`

### If the server won't start:

- Check the logs for TypeScript compilation errors
- Ensure all dependencies are installed: `make docker-compose-dev-up --build`

### To rebuild the container:

```bash
make docker-compose-dev-down
make docker-compose-dev-up --build
```

## 🎉 You're All Set!

Your development environment is now running with live reload. Any changes you make to your TypeScript files will automatically restart the server and be available immediately!
