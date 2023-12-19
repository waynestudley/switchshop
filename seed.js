const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fetchAndSeed() {
  try {
    // Fetch data from the original API
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const apiData = response.data.results;

    // Seed the Prisma database with data from the API
    for (const item of apiData) {
      await prisma.pokemon.create({
        data: {
          name: item.name,
          url: item.url,
        },
      });
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndSeed();
