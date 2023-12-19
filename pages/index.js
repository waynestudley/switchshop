import React, { useState, useEffect } from 'react'
import 'typeface-roboto'
import { apiBuilder } from './api/api'
import Image from 'next/image'
import PokemonDetails from './pokemonDetails' // Import the PokemonDetails component

export default function Home() {
  const [data, setData] = useState([])
  const [stat, setStat] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pokeLimit = 151
  const [allItemNames, setAllItemNames] = useState([])
  const [sortDirection, setSortDirection] = useState('asc')
  const [selectedPokemon, setSelectedPokemon] = useState(null) // State for selected Pokémon details

  const fetchData = async () => {
    try {
      const response = await apiBuilder(`pokemon?limit=${pokeLimit}`)
      setData(response.data.results)
      setLoading(false)
      const itemNames = response.data.results.map((item) => item.name)
      // Sort item names based on sortDirection
      const sortedItemNames =
        sortDirection === 'asc' ? itemNames.sort() : itemNames.sort().reverse()
      setAllItemNames(sortedItemNames)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const extractIdFromUrl = (url) => {
    const parts = url.split('/')
    return parts[parts.length - 2]
  }

  const handleItemClick = async (id) => {
    setSelectedItem(id)
    try {
      const response = await apiBuilder(`pokemon/${id}`)
      if (response.data) {
        const { id, name, types, stats } = response.data
        const reducedData = {
          id,
          name,
          types,
          stats,
        }
        setStat(reducedData)
      } else {
        console.error('Response data is missing or empty.')
      }
    } catch (error) {
      setError(error)
    }
  }

  // All names should start with a Capital letter surely - even that of a Pokey Thing?
  const capName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Fetch data on load - similar to componentDidMount in Class components
  useEffect(() => {
    fetchData()
  }, []) // [] ensures this only runs once

  const handleComboBoxChange = async (event) => {
    const selectedName = event.target.value
    const selectedItem = data.find((item) => item.name === selectedName)
    if (selectedItem) {
      const id = extractIdFromUrl(selectedItem.url)
      try {
        const response = await apiBuilder(`pokemon/${id}`)
        if (response.data) {
          const { id, name, types, stats } = response.data
          const reducedData = {
            id,
            name,
            types,
            stats,
          }
          setSelectedPokemon(reducedData)
        } else {
          console.error('Data is missing or empty.')
        }
      } catch (error) {
        setError(error)
      }
    }
  }

  // Simple toggle for a-z, z-a
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    fetchData()
  }

  return (
    <div>
      <div className="image-container">
        <button onClick={toggleSortDirection}>
          {sortDirection === 'asc' ? ' Sort list Z-A ' : ' Sort list A-Z '}
        </button>
        <select onChange={handleComboBoxChange} value={selectedItem || ''}>
          <option value="">Select an item</option>
          {allItemNames.map((itemName) => (
            <option key={itemName} value={itemName}>
              {itemName}
            </option>
          ))}
        </select>
      </div>
      <div style={{ margin: '20px' }}>
        {/* Added component to display selected Poke */}
        <PokemonDetails pokemon={selectedPokemon}  capName={capName}/>
      </div>
      <div className="image-container">
        {data.map((item, index) => (
          <div key={index} className="pokemon-image-container">
            <Image
              src={`/sprites/${extractIdFromUrl(item.url)}.svg`}
              alt={item.name}
              className="pokemon-image zoom-image"
              width="100"
              height="100"
              onClick={() => handleItemClick(extractIdFromUrl(item.url))}
            />
            <div className="image-label-container">
              <div className="image-label">{capName(item.name)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
