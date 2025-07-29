# Swagger API Documentation Setup

## 🎯 Overview

This project uses **Swagger UI** with **OpenAPI 3.0** to provide comprehensive, interactive API documentation.

## 📖 Accessing the Documentation

### Development Environment

- **Swagger UI**: http://localhost:3005/api/docs
- **OpenAPI JSON**: http://localhost:3005/api/docs/json

### Production Environment

- **Swagger UI**: https://api.yellowbearstore.com/api/docs
- **OpenAPI JSON**: https://api.yellowbearstore.com/api/docs/json

## 🛠️ Implementation Details

### Files Structure

```
src/
├── config/
│   └── swagger.ts          # Swagger configuration
├── routes/
│   └── swagger.ts          # Swagger UI routes
└── controllers/
    ├── healthController.ts # Health endpoints (documented)
    └── quoteController.ts  # Quote endpoints (documented)
```

### Dependencies

```json
{
  "swagger-ui-express": "^5.0.0",
  "swagger-jsdoc": "^6.2.8",
  "@types/swagger-ui-express": "^4.1.6",
  "@types/swagger-jsdoc": "^6.0.4"
}
```

## 📝 Adding Documentation to New Endpoints

### 1. JSDoc Comments Format

```typescript
/**
 * @swagger
 * /api/endpoint:
 *   method:
 *     summary: Brief description
 *     description: Detailed description
 *     tags: [TagName]
 *     parameters:
 *       - in: path/query/header
 *         name: parameterName
 *         required: true/false
 *         schema:
 *           type: string/integer/boolean
 *         description: Parameter description
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchemaName'
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSchema'
 */
```

### 2. Example: GET Endpoint

```typescript
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user by their unique identifier
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
```

### 3. Example: POST Endpoint

```typescript
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided information
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
```

## 🔧 Configuration Options

### Swagger UI Customization

```typescript
swaggerUi.setup(specs, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Yellow Bear Store API Documentation",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    docExpansion: "list", // "none", "list", "full"
    filter: true, // Enable search/filter
    showRequestHeaders: true, // Show request headers
    tryItOutEnabled: true, // Enable "Try it out" feature
  },
});
```

### OpenAPI Configuration

```typescript
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Title",
      version: "1.0.0",
      description: "API Description",
      contact: {
        name: "Support Team",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3005",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        // Define your schemas here
      },
      securitySchemes: {
        // Define authentication schemes
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};
```

## 🎨 Customizing Schemas

### Adding New Schemas

```typescript
components: {
  schemas: {
    User: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        name: {
          type: "string",
          example: "John Doe",
        },
        email: {
          type: "string",
          format: "email",
          example: "john@example.com",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-25T12:56:32.332Z",
        },
      },
    },
  },
}
```

## 🔒 Security Documentation

### Bearer Token Authentication

```typescript
components: {
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
security: [
  {
    BearerAuth: [],
  },
],
```

### Using Security in Endpoints

```typescript
/**
 * @swagger
 * /api/protected:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Protected endpoint
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
```

## 🚀 Best Practices

### 1. Consistent Tagging

- Use consistent tag names across related endpoints
- Group endpoints logically (e.g., "Users", "Products", "Orders")

### 2. Detailed Descriptions

- Provide clear, concise summaries
- Include detailed descriptions for complex endpoints
- Add examples for request/response bodies

### 3. Proper Error Documentation

- Document all possible error responses
- Include appropriate HTTP status codes
- Provide meaningful error descriptions

### 4. Schema Reusability

- Define reusable schemas in the components section
- Reference schemas using `$ref: '#/components/schemas/SchemaName'`
- Keep schemas consistent across endpoints

### 5. Parameter Documentation

- Document all path, query, and header parameters
- Specify required vs optional parameters
- Include parameter examples and descriptions

## 🔍 Testing the Documentation

### 1. Start the Development Server

```bash
make docker-compose-dev-up
```

### 2. Access Swagger UI

- Open http://localhost:3005/api/docs in your browser
- Explore the interactive documentation
- Test endpoints using the "Try it out" feature

### 3. Validate OpenAPI Spec

```bash
# Get the raw OpenAPI specification
curl http://localhost:3005/api/docs/json | jq .
```

## 🎉 Benefits

- ✅ **Interactive Testing**: Test endpoints directly from the documentation
- ✅ **Auto-generated**: Documentation stays in sync with code
- ✅ **Professional**: Professional-looking API documentation
- ✅ **Standards Compliant**: Follows OpenAPI 3.0 specification
- ✅ **Developer Friendly**: Easy for other developers to understand and use

Your API documentation is now live and ready for use! 🚀
