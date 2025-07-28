# Yellow Bear Store API Documentation

## Base URL

```
http://localhost:3005/api
```

## Authentication

Currently, the API doesn't require authentication. In a production environment, you should implement JWT or OAuth2 authentication.

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### Health Check

#### GET /health

Get detailed health information about the API.

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "development",
  "version": "1.0.0",
  "memory": {
    "used": 45.2,
    "total": 64.0
  },
  "services": {
    "database": "OK",
    "cache": "OK"
  }
}
```

#### GET /health/ping

Simple ping endpoint for load balancers.

**Response:**

```json
{
  "status": "pong"
}
```

### Quotes

#### POST /quotes/catalog

Create a new catalog quote.

**Request Body:**

```json
{
  "catalogId": 123,
  "fullName": "John Doe",
  "companyName": "Test Company",
  "cuilCuit": "20-12345678-9",
  "address": {
    "address": "123 Main St, City",
    "coordinates": {
      "lat": -34.603684,
      "lng": -58.381559
    }
  },
  "hasReferencePrice": false,
  "referencePriceDescription": "Optional description",
  "referencePriceFileURL": "https://example.com/file.pdf",
  "paymentMethod": "LOCAL_CASH",
  "contactInfo": {
    "email": "john@example.com",
    "phoneNumber": "+1234567890"
  },
  "comments": "Please provide a quote for this product"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1753296884595,
    "type": "catalog",
    "catalogId": 123,
    "fullName": "John Doe",
    "companyName": "Test Company",
    "hasReferencePrice": false,
    "contactInfo": {
      "email": "john@example.com",
      "phoneNumber": "+1234567890"
    },
    "comments": "Please provide a quote for this product",
    "createdAt": "2025-07-23T18:54:44.595Z"
  },
  "message": "Catalog quote created successfully"
}
```

#### POST /quotes/custom

Create a new custom quote.

**Request Body:**

```json
{
  "productDetails": {
    "name": "Custom Product",
    "url": "https://example.com/product",
    "description": "Product description",
    "serialNumber": "SN123456"
  },
  "fullName": "Jane Smith",
  "companyName": "Custom Company",
  "cuilCuit": "20-87654321-0",
  "address": {
    "address": "456 Oak St, City",
    "coordinates": {
      "lat": -34.603684,
      "lng": -58.381559
    }
  },
  "hasReferencePrice": true,
  "referencePriceDescription": "Reference price from competitor",
  "referencePriceFileURL": "https://example.com/reference.pdf",
  "paymentMethod": "WIRE",
  "contactInfo": {
    "email": "jane@example.com",
    "phoneNumber": "+0987654321"
  },
  "comments": "Need a quote for this custom product"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1753296884596,
    "type": "custom",
    "productDetails": {
      "name": "Custom Product",
      "url": "https://example.com/product",
      "description": "Product description",
      "serialNumber": "SN123456"
    },
    "fullName": "Jane Smith",
    "hasReferencePrice": true,
    "contactInfo": {
      "email": "jane@example.com",
      "phoneNumber": "+0987654321"
    },
    "comments": "Need a quote for this custom product",
    "createdAt": "2025-07-23T18:54:44.596Z"
  },
  "message": "Custom quote created successfully"
}
```

#### GET /quotes

Get all quotes with filters and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `type` (optional): Filter by type ("catalog" or "custom")
- `productId` (optional): Filter by product ID
- `catalogId` (optional): Filter by catalog ID
- `fullName` (optional): Filter by full name
- `companyName` (optional): Filter by company name
- `paymentMethod` (optional): Filter by payment method
- `dateFrom` (optional): Filter by start date
- `dateTo` (optional): Filter by end date

**Example Request:**

```
GET /quotes?type=catalog&page=1&limit=10&productId=123
```

**Response:**

```json
{
  "success": true,
  "data": {
    "quotes": [
      {
        "id": 1,
        "type": "catalog",
        "catalogId": 123,
        "fullName": "John Doe",
        "companyName": "Test Company",
        "hasReferencePrice": false,
        "contactInfo": {
          "email": "john@example.com"
        },
        "comments": "Test catalog quote",
        "createdAt": "2025-07-23T18:54:44.595Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 1,
      "itemsPerPage": 10
    }
  },
  "message": "Quotes retrieved successfully"
}
```

#### GET /quotes/:id

Get a specific quote by ID.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "catalog",
    "catalogId": 123,
    "fullName": "John Doe",
    "companyName": "Test Company",
    "hasReferencePrice": false,
    "contactInfo": {
      "email": "john@example.com"
    },
    "comments": "Test catalog quote",
    "createdAt": "2025-07-23T18:54:44.595Z"
  },
  "message": "Quote retrieved successfully"
}
```

#### PUT /quotes/catalog/:id

Update a catalog quote.

**Request Body:** (Same structure as POST /quotes/catalog, but all fields are optional)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "catalog",
    "catalogId": 123,
    "fullName": "Updated John Doe",
    "companyName": "Updated Company",
    "hasReferencePrice": true,
    "contactInfo": {
      "email": "updated@example.com"
    },
    "comments": "Updated comments",
    "createdAt": "2025-07-23T18:54:44.595Z",
    "updatedAt": "2025-07-23T19:00:00.000Z"
  },
  "message": "Quote updated successfully"
}
```

#### PUT /quotes/custom/:id

Update a custom quote.

**Request Body:** (Same structure as POST /quotes/custom, but all fields are optional)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "catalog",
    "catalogId": 123,
    "fullName": "John Doe Updated",
    "companyName": "Test Company",
    "hasReferencePrice": false,
    "contactInfo": {
      "email": "john@example.com"
    },
    "comments": "Updated comment",
    "createdAt": "2025-07-23T18:54:44.595Z",
    "updatedAt": "2025-07-23T19:00:00.000Z"
  },
  "message": "Quote updated successfully"
}
```

#### DELETE /quotes/:id

Delete a quote.

**Response:**

```json
{
  "success": true,
  "message": "Quote deleted successfully"
}
```

## Error Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 200         | Success                                 |
| 201         | Created                                 |
| 400         | Bad Request - Invalid input             |
| 401         | Unauthorized - Authentication required  |
| 404         | Not Found - Resource not found          |
| 409         | Conflict - Resource already exists      |
| 429         | Too Many Requests - Rate limit exceeded |
| 500         | Internal Server Error                   |

## Rate Limiting

The API implements rate limiting to prevent abuse:

- 100 requests per 15 minutes per IP address
- Rate limit headers are included in responses

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:3005/api/health

# Simple ping
curl http://localhost:3005/api/health/ping

# Create catalog quote
curl -X POST http://localhost:3005/api/quotes/catalog \
  -H "Content-Type: application/json" \
  -d '{
    "catalogId": 123,
    "fullName": "John Doe",
    "contactInfo": {"email": "john@example.com"},
    "comments": "Test quote"
  }'

# Get quotes
curl http://localhost:3005/api/quotes?type=catalog&page=1&limit=10

# API info
curl http://localhost:3005/api
```
