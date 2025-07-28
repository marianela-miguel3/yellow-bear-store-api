/**
 * @swagger
 * components:
 *   schemas:
 *     # All schema definitions are now in src/config/swagger.ts
 */

/**
 * @swagger
 * /api/quotes/catalog:
 *   post:
 *     summary: Create a catalog quote
 *     description: Create a new quote based on existing catalog items
 *     tags: [Quotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catalogId
 *               - hasReferencePrice
 *               - contactInfo
 *               - comments
 *             properties:
 *               catalogId:
 *                 type: integer
 *                 example: 123
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               companyName:
 *                 type: string
 *                 example: "Acme Corp"
 *               cuilCuit:
 *                 type: string
 *                 example: "20-12345678-9"
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "123 Main St, City, Country"
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: -34.6037
 *                       lng:
 *                         type: number
 *                         example: -58.3816
 *               hasReferencePrice:
 *                 type: boolean
 *                 example: true
 *               referencePriceDescription:
 *                 type: string
 *                 example: "Competitor pricing"
 *               referencePriceFileURL:
 *                 type: string
 *                 example: "https://example.com/file.pdf"
 *               paymentMethod:
 *                 type: string
 *                 enum: ["LOCAL_CASH", "OFFSHORE_CASH", "WIRE", "LETTER_OFF_CREDIT"]
 *                 example: "WIRE"
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "john@example.com"
 *                   phoneNumber:
 *                     type: string
 *                     example: "+54 11 1234-5678"
 *               comments:
 *                 type: string
 *                 example: "Urgent delivery required"
 *     responses:
 *       201:
 *         description: Catalog quote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CatalogQuoteResponse'
 *                 message:
 *                   type: string
 *                   example: "Catalog quote created successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/quotes/custom:
 *   post:
 *     summary: Create a custom quote
 *     description: Create a new custom quote with specific requirements
 *     tags: [Quotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productDetails
 *               - hasReferencePrice
 *               - contactInfo
 *               - comments
 *             properties:
 *               productDetails:
 *                 type: object
 *                 required: ["name", "description"]
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Custom Yellow Bear Plush"
 *                   url:
 *                     type: string
 *                     example: "https://example.com/product"
 *                   description:
 *                     type: string
 *                     example: "Large size with custom embroidery"
 *                   serialNumber:
 *                     type: string
 *                     example: "YB-2025-001"
 *               fullName:
 *                 type: string
 *                 example: "Jane Smith"
 *               companyName:
 *                 type: string
 *                 example: "Tech Solutions"
 *               cuilCuit:
 *                 type: string
 *                 example: "30-98765432-1"
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "456 Oak St, City, Country"
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: -34.6037
 *                       lng:
 *                         type: number
 *                         example: -58.3816
 *               hasReferencePrice:
 *                 type: boolean
 *                 example: false
 *               referencePriceDescription:
 *                 type: string
 *                 example: "Market research pricing"
 *               referencePriceFileURL:
 *                 type: string
 *                 example: "https://example.com/research.pdf"
 *               paymentMethod:
 *                 type: string
 *                 enum: ["LOCAL_CASH", "OFFSHORE_CASH", "WIRE", "LETTER_OFF_CREDIT"]
 *                 example: "LOCAL_CASH"
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "jane@example.com"
 *                   phoneNumber:
 *                     type: string
 *                     example: "+54 11 9876-5432"
 *               comments:
 *                 type: string
 *                 example: "Custom design requirements"
 *     responses:
 *       201:
 *         description: Custom quote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CustomQuoteResponse'
 *                 message:
 *                   type: string
 *                   example: "Custom quote created successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Get all quotes with filters
 *     description: Retrieve quotes with optional filtering and pagination
 *     tags: [Quotes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [catalog, custom]
 *         description: Filter by quote type
 *       - in: query
 *         name: catalogId
 *         schema:
 *           type: integer
 *         description: Filter by catalog ID
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         description: Filter by customer name
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum: ["LOCAL_CASH", "OFFSHORE_CASH", "WIRE", "LETTER_OFF_CREDIT"]
 *         description: Filter by payment method
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *     responses:
 *       200:
 *         description: Quotes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     quotes:
 *                       type: array
 *                       items:
 *                         oneOf:
 *                           - $ref: '#/components/schemas/CatalogQuoteResponse'
 *                           - $ref: '#/components/schemas/CustomQuoteResponse'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 3
 *                         totalItems:
 *                           type: integer
 *                           example: 25
 *                         itemsPerPage:
 *                           type: integer
 *                           example: 10
 *                 message:
 *                   type: string
 *                   example: "Quotes retrieved successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/quotes/{id}:
 *   get:
 *     summary: Get a quote by ID
 *     description: Retrieve a specific quote by its unique identifier
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quote ID
 *     responses:
 *       200:
 *         description: Quote retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/CatalogQuoteResponse'
 *                     - $ref: '#/components/schemas/CustomQuoteResponse'
 *                 message:
 *                   type: string
 *                   example: "Quote retrieved successfully"
 *       400:
 *         description: Invalid quote ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Quote not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'

 *   delete:
 *     summary: Delete a quote
 *     description: Remove a quote from the system
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quote ID
 *     responses:
 *       200:
 *         description: Quote deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Quote deleted successfully"
 *       400:
 *         description: Invalid quote ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Quote not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/quotes/catalog/{id}:
 *   put:
 *     summary: Update a catalog quote
 *     description: Update an existing catalog quote by ID
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Catalog quote ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catalogId:
 *                 type: integer
 *                 example: 123
 *               fullName:
 *                 type: string
 *                 example: "Updated John Doe"
 *               companyName:
 *                 type: string
 *                 example: "Updated Company"
 *               cuilCuit:
 *                 type: string
 *                 example: "20-12345678-9"
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "Updated Address"
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: -34.6037
 *                       lng:
 *                         type: number
 *                         example: -58.3816
 *               hasReferencePrice:
 *                 type: boolean
 *                 example: true
 *               referencePriceDescription:
 *                 type: string
 *                 example: "Updated reference price"
 *               referencePriceFileURL:
 *                 type: string
 *                 example: "https://example.com/updated-file.pdf"
 *               paymentMethod:
 *                 type: string
 *                 enum: ["LOCAL_CASH", "OFFSHORE_CASH", "WIRE", "LETTER_OFF_CREDIT"]
 *                 example: "WIRE"
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "updated@example.com"
 *                   phoneNumber:
 *                     type: string
 *                     example: "+54 11 9876-5432"
 *               comments:
 *                 type: string
 *                 example: "Updated comments"
 *     responses:
 *       200:
 *         description: Catalog quote updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CatalogQuoteResponse'
 *                 message:
 *                   type: string
 *                   example: "Quote updated successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Catalog quote not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/quotes/custom/{id}:
 *   put:
 *     summary: Update a custom quote
 *     description: Update an existing custom quote by ID
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Custom quote ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productDetails:
 *                 type: object
 *                 required: ["name", "description"]
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Updated Custom Product"
 *                   url:
 *                     type: string
 *                     example: "https://example.com/updated-product"
 *                   description:
 *                     type: string
 *                     example: "Updated product description"
 *                   serialNumber:
 *                     type: string
 *                     example: "YB-2025-002"
 *               fullName:
 *                 type: string
 *                 example: "Updated Jane Smith"
 *               companyName:
 *                 type: string
 *                 example: "Updated Tech Solutions"
 *               cuilCuit:
 *                 type: string
 *                 example: "30-98765432-1"
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "Updated Address"
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: -34.6037
 *                       lng:
 *                         type: number
 *                         example: -58.3816
 *               hasReferencePrice:
 *                 type: boolean
 *                 example: false
 *               referencePriceDescription:
 *                 type: string
 *                 example: "Updated reference price"
 *               referencePriceFileURL:
 *                 type: string
 *                 example: "https://example.com/updated-file.pdf"
 *               paymentMethod:
 *                 type: string
 *                 enum: ["LOCAL_CASH", "OFFSHORE_CASH", "WIRE", "LETTER_OFF_CREDIT"]
 *                 example: "LOCAL_CASH"
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "updated@example.com"
 *                   phoneNumber:
 *                     type: string
 *                     example: "+54 11 9876-5432"
 *               comments:
 *                 type: string
 *                 example: "Updated comments"
 *     responses:
 *       200:
 *         description: Custom quote updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CustomQuoteResponse'
 *                 message:
 *                   type: string
 *                   example: "Quote updated successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Custom quote not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
