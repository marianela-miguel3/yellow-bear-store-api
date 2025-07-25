import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "../config/swagger";

const router = Router();

// Serve Swagger UI
router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Yellow Bear Store API Documentation",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      docExpansion: "list",
      filter: true,
      showRequestHeaders: true,
      tryItOutEnabled: true,
    },
  })
);

// Serve raw OpenAPI spec
router.get("/json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

export default router;
