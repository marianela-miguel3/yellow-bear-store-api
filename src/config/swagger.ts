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
        // Quote-related schemas
        Coordinates: {
          type: "object",
          properties: {
            lat: {
              type: "number",
              example: -34.6037,
            },
            lng: {
              type: "number",
              example: -58.3816,
            },
          },
        },
        Address: {
          type: "object",
          properties: {
            address: {
              type: "string",
              example: "123 Main St, City, Country",
            },
            coordinates: {
              $ref: "#/components/schemas/Coordinates",
            },
          },
        },
        ContactInfo: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "contact@example.com",
            },
            phoneNumber: {
              type: "string",
              example: "+54 11 1234-5678",
            },
          },
        },
        ProductDetails: {
          type: "object",
          required: ["name", "description"],
          properties: {
            name: {
              type: "string",
              example: "Custom Yellow Bear Plush",
            },
            url: {
              type: "string",
              example: "https://example.com/product",
            },
            description: {
              type: "string",
              example: "Large size with custom embroidery",
            },
            serialNumber: {
              type: "string",
              example: "YB-2025-001",
            },
          },
        },
        PaymentMethod: {
          type: "string",
          enum: ["LOCAL_CASH", "OFFSHORE_CASH", "WIRE", "LETTER_OFF_CREDIT"],
          example: "WIRE",
        },
        CatalogQuoteResponse: {
          type: "object",
          required: [
            "id",
            "type",
            "catalogId",
            "hasReferencePrice",
            "contactInfo",
            "comments",
            "createdAt",
          ],
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            type: {
              type: "string",
              enum: ["catalog"],
              example: "catalog",
            },
            catalogId: {
              type: "integer",
              example: 123,
            },
            fullName: {
              type: "string",
              example: "John Doe",
            },
            companyName: {
              type: "string",
              example: "Acme Corp",
            },
            cuilCuit: {
              type: "string",
              example: "20-12345678-9",
            },
            address: {
              $ref: "#/components/schemas/Address",
            },
            hasReferencePrice: {
              type: "boolean",
              example: true,
            },
            referencePriceDescription: {
              type: "string",
              example: "Competitor pricing",
            },
            referencePriceFileURL: {
              type: "string",
              example: "https://example.com/file.pdf",
            },
            paymentMethod: {
              $ref: "#/components/schemas/PaymentMethod",
            },
            contactInfo: {
              $ref: "#/components/schemas/ContactInfo",
            },
            comments: {
              type: "string",
              example: "Urgent delivery required",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-25T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-25T12:30:00Z",
            },
          },
        },
        CustomQuoteResponse: {
          type: "object",
          required: [
            "id",
            "type",
            "productDetails",
            "hasReferencePrice",
            "contactInfo",
            "comments",
            "createdAt",
          ],
          properties: {
            id: {
              type: "integer",
              example: 2,
            },
            type: {
              type: "string",
              enum: ["custom"],
              example: "custom",
            },
            productDetails: {
              $ref: "#/components/schemas/ProductDetails",
            },
            fullName: {
              type: "string",
              example: "Jane Smith",
            },
            companyName: {
              type: "string",
              example: "Tech Solutions",
            },
            cuilCuit: {
              type: "string",
              example: "30-98765432-1",
            },
            address: {
              $ref: "#/components/schemas/Address",
            },
            hasReferencePrice: {
              type: "boolean",
              example: false,
            },
            referencePriceDescription: {
              type: "string",
              example: "Market research pricing",
            },
            referencePriceFileURL: {
              type: "string",
              example: "https://example.com/research.pdf",
            },
            paymentMethod: {
              $ref: "#/components/schemas/PaymentMethod",
            },
            contactInfo: {
              $ref: "#/components/schemas/ContactInfo",
            },
            comments: {
              type: "string",
              example: "Custom design requirements",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-25T13:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-25T13:15:00Z",
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
