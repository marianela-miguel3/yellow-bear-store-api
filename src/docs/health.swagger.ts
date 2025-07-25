/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Get detailed health information
 *     description: Returns comprehensive health status including system metrics, uptime, and service status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Health check successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/health/ping:
 *   get:
 *     summary: Simple ping endpoint
 *     description: Returns a simple pong response to verify the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Ping successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PingResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
