import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yellow Bear Store API",
      version: "1.0.0",
      description: "A comprehensive REST API for the Yellow Bear Store",
      contact: {
        name: "API Support",
        email: "support@yellowbearstore.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3005",
        description: "Development server",
      },
      {
        url: "https://api.yellowbearstore.com",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Health check and monitoring endpoints",
      },
      {
        name: "Quotes",
        description: "Quote management operations",
      },
    ],
    components: {
      schemas: {
        HealthResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "OK",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2025-07-25T12:56:32.332Z",
            },
            uptime: {
              type: "number",
              example: 7.192547504,
            },
            environment: {
              type: "string",
              example: "development",
            },
            version: {
              type: "string",
              example: "1.0.0",
            },
            memory: {
              type: "object",
              properties: {
                used: {
                  type: "number",
                  example: 91.26,
                },
                total: {
                  type: "number",
                  example: 128.94,
                },
              },
            },
            services: {
              type: "object",
              properties: {
                database: {
                  type: "string",
                  example: "OK",
                },
                cache: {
                  type: "string",
                  example: "OK",
                },
              },
            },
          },
        },
        PingResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "pong",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              example: "Internal server error",
            },
          },
        },
        Quote: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "quote_123",
            },
            type: {
              type: "string",
              enum: ["catalog", "custom"],
              example: "catalog",
            },
            customerName: {
              type: "string",
              example: "John Doe",
            },
            customerEmail: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    example: "prod_123",
                  },
                  quantity: {
                    type: "integer",
                    example: 2,
                  },
                  price: {
                    type: "number",
                    example: 29.99,
                  },
                },
              },
            },
            totalAmount: {
              type: "number",
              example: 59.98,
            },
            status: {
              type: "string",
              enum: ["pending", "approved", "rejected"],
              example: "pending",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-25T12:56:32.332Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-25T12:56:32.332Z",
            },
          },
        },
      },
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
  },
  apis: ["./src/docs/*.ts"], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
