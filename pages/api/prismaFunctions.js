import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPokemon = async () => {
  const pokemon = await prisma.pokemon.findMany();
  return pokemon;
};
