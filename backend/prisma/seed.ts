import { Categories, PrismaClient, Recipes, Users } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    console.log('......................................')
    console.log('The database seed will be started.....')

    let user: Users;
    let category: Categories;
    let recipe: Recipes;

    const usersCount = await prisma.users.count();
    if (usersCount == 0) {
        user = await prisma.users.create({
            data: {
                name: "Flavia Aguera Costa",
                email: "senha:12345678@gmail.com",
                password: "$2b$08$6psqR/Akrs/LOe5cdZQYG.umdP98EYgerasaC.xPPRHStclQ28U/i",
                username: "flaviabolobom",
                phone: "17997890354",
                img_url: "https://pub-cb3772b884d84e06bee1c51ef150ec46.r2.dev/1730837093259.jpg",

            }
        });
        console.log(new Date().toISOString().slice(11, 23) + '...........✓ Users seeded!')
    } else {
        user = await prisma.users.findFirst();
    }

    const categoriesCount = await prisma.categories.count();
    if (categoriesCount == 0) {
        category = await prisma.categories.create({ data: { name: "Bolo Bom" } });
        console.log(new Date().toISOString().slice(11, 23) + '......✓ Categories seeded!')
    } else {
        category = await prisma.categories.findFirst();
    }

    const recipesCount = await prisma.recipes.count();
    if (recipesCount == 0) {
        recipe = await prisma.recipes.create({
            data: {
                title: "Bolo delicioso de chocolate",
                category_id: category.id_category,
                ingredients: "Carinho, amor e ternura",
                preparation_method: "Meia xícara de paz e esperança e... MINSTURA!",
                observation: "O bolo é bom.",
                user_id: user.id_user
            }
        });
        console.log(new Date().toISOString().slice(11, 23) + '.........✓ Recipes seeded!')
    } else {
        recipe = await prisma.recipes.findFirst();
    }

    const favoritesCount = await prisma.favorites.count();
    if (favoritesCount == 0) {
        await prisma.favorites.create({
            data: {
                recipe_id: recipe.id_recipes,
                user_id: user.id_user
            }
        });
        console.log(new Date().toISOString().slice(11, 23) + '.......✓ Favorites seeded!')
    }

    const ratingsCount = await prisma.ratings.count();
    if (ratingsCount == 0) {
        await prisma.ratings.create({
            data: {
                rating_value: 4,
                recipe_id: recipe.id_recipes,
                user_id: user.id_user
            }
        });
        console.log(new Date().toISOString().slice(11, 23) + '.........✓ Ratings seeded!')
    }

    const commentsCount = await prisma.comments.count();
    if (commentsCount == 0) {
        await prisma.comments.create({
            data: {
                content: 'Amo fazer esse bolinho para o gordinho lá de casa <3. #BoloBom #FicaaDica #HenriquedaFarmacia',
                recipe_id: recipe.id_recipes,
                user_id: user.id_user
            }
        });
        console.log(new Date().toISOString().slice(11, 23) + '........✓ Comments seeded!')
    }

    console.log('......................................');
    console.log('Database seed is finished.............');
    await prisma.$disconnect();
}

seed().catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
