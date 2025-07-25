# Yellow Bear Store API

A Node.js REST API built with Express.js, TypeScript, and Docker for the Yellow Bear Store.

## 🚀 Features

- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe JavaScript development
- **Docker** - Containerized deployment
- **Security** - Helmet, CORS, rate limiting
- **Logging** - Morgan HTTP request logger
- **Error Handling** - Global error handling middleware
- **Health Checks** - Built-in health monitoring
- **API Documentation** - RESTful endpoints with examples

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## 🛠️ Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd yellow-bear-store-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Docker Deployment

#### Production Deployment

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **Or build and run with Docker**
   ```bash
   docker build -t yellow-bear-store-api .
   docker run -p 3005:3005 yellow-bear-store-api
   ```

#### Development with Live Reload

For development with real-time file watching and automatic restarts:

1. **Start development environment**

   ```bash
   make docker-compose-dev-up
   ```

2. **View logs**

   ```bash
   make docker-compose-dev-logs
   ```

3. **Access container shell**

   ```bash
   make docker-compose-dev-shell
   ```

4. **Stop development environment**
   ```bash
   make docker-compose-dev-down
   ```

**Benefits of Development Mode:**

- ✅ Live reload on file changes
- ✅ TypeScript compilation on-the-fly
- ✅ Volume binding for real-time development
- ✅ Hot reload with nodemon
- ✅ All changes in your local `src/` folder are immediately reflected in the container

## 🏃‍♂️ Available Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon and ts-node
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

## 📚 API Endpoints

### Health Check

- `GET /api/health` - Detailed health information
- `GET /api/health/ping` - Simple ping response

### Quotes Management

- `POST /api/quotes/catalog` - Create a catalog quote
- `POST /api/quotes/custom` - Create a custom quote
- `GET /api/quotes` - Get all quotes with filters and pagination
- `GET /api/quotes/:id` - Get a specific quote by ID
- `PUT /api/quotes/:id` - Update a quote
- `DELETE /api/quotes/:id` - Delete a quote

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Server Configuration
NODE_ENV=development
PORT=3005

# Security
JWT_SECRET=your-super-secret-jwt-key-here
BCRYPT_ROUNDS=12

# Database (if you add one later)
# DATABASE_URL=postgresql://username:password@localhost:5432/database_name


# Logging
LOG_LEVEL=info
```

## 🧪 Development

```bash
# Build TypeScript to JavaScript
npm run build

# Start development server with hot reload
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📦 Project Structure

```
yellow-bear-store-api/
├── src/
│   ├── app.ts              # Main application file
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # API types and interfaces
│   ├── routes/             # API routes (route definitions only)
│   │   ├── index.ts        # Route aggregator
│   │   └── health.ts       # Health check routes
│   ├── controllers/        # Business logic implementation
│   │   ├── index.ts        # Controller exports
│   │   ├── apiController.ts # API info controller
│   │   └── healthController.ts # Health check controller
│   ├── models/             # Data access layer
│   │   ├── index.ts        # Model exports
│   │   ├── baseModel.ts    # Base model class
│   │   └── healthModel.ts  # Health model implementation
│   └── middleware/         # Custom middleware
│       ├── errorHandler.ts # Global error handler
│       └── notFoundHandler.ts # 404 handler
├── dist/                   # Compiled JavaScript (generated)
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── env.example            # Environment variables template
├── README.md              # This file
└── API.md                 # Detailed API documentation
```

## 🏗️ Architecture

This API follows the **MVC (Model-View-Controller)** pattern:

- **Routes**: Define API endpoints and map them to controllers
- **Controllers**: Handle HTTP requests/responses and business logic
- **Models**: Manage data access and database operations

### Adding New Features

To add new features (e.g., users, products):

1. **Create Model**: Extend `BaseModel` in `src/models/`
2. **Create Controller**: Implement business logic in `src/controllers/`
3. **Create Routes**: Define endpoints in `src/routes/`
4. **Update Types**: Add interfaces in `src/types/index.ts`

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **Input Validation** - Request validation
- **Error Handling** - Secure error responses

## 🚀 Deployment

### Production with Docker

1. **Build the production image**

   ```bash
   docker build -t yellow-bear-store-api:production .
   ```

2. **Run the container**
   ```bash
   docker run -d \
     --name yellow-bear-api \
     -p 3005:3005 \
     -e NODE_ENV=production \
     yellow-bear-store-api:production
   ```

### Environment-Specific Configurations

- **Development**: `NODE_ENV=development`
- **Production**: `NODE_ENV=production`
- **Testing**: `NODE_ENV=test`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with basic CRUD operations
- Basic Express.js setup with Docker
- Health check endpoints
- Product and User management
- Security middleware
- Error handling
