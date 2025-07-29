import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create a test quote
  const quote = await prisma.quote.create({
    data: {
      // Basic data for testing
    },
  });

  console.log("✅ Created test quote:", quote);

  // Create a test product
  const product = await prisma.product.create({
    data: {
      // Basic data for testing
    },
  });

  console.log("✅ Created test product:", product);

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
