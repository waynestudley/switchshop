import axios from "axios";

const getApiUrl = (apiPath) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASEURL}${apiPath || ""}`;
  return apiUrl;
};

export const apiBuilder = (apiPath) => {
  const apiUrl = getApiUrl(apiPath);

  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 300000
  });

  return instance.get();
};


// Example code to create a new user using Prisma Client
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPokemon() {
  try {
    const pokemon = await prisma.pokemon.findMany();
    return pokemon;
  } catch (error) {
    throw new Error("Error fetching Pokemon data: " + error.message);
  }
}