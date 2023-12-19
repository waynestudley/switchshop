import React from 'react'
import Image from 'next/image'

export default function PokemonDetails({ pokemon, capName }) {
  if (!pokemon) {
    return null
  }

  return (
    <div
      style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      textAlign: 'center'
    }}>
      <h2>{capName(pokemon.name)}</h2>
      <Image
        src={`/sprites/${pokemon.id}.svg`}
        alt={pokemon.name}
        width="250"
        height="250"
      />
    </div>
  )
}