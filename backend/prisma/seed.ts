import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const categoriesCount = await prisma.categories.count();
    if (categoriesCount == 0) {
        await prisma.categories.create({ data: { name: "Bolo Bom" } });
        console.log('✓ Categories seeded!')
    }

    console.log('Database seed is finished');
    await prisma.$disconnect();
}

seed().catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
