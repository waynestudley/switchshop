import React, { useState, useEffect } from 'react'
import 'typeface-roboto'
import { apiBuilder } from "./api/api"
import Image from 'next/image'

export default function Home() {
  const [data, setData] = useState([])
  const [stat, setStat] = useState([])
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pokeLimit = 151

  const fetchData = async () => {
    try {
      const response = await apiBuilder(
        `pokemon?limit=${pokeLimit}` // Appended to the .env BASEURL
      );
      setData(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  const handleItemClick = async (id) => {
    setSelectedItem(id);
    try {
      const response = await apiBuilder(`pokemon/${id}`);
      
      if (response.data) {
        const { id, name, types, stats } = response.data;
        const reducedData = {
          id,
          name,
          types,
          stats
        };
        setStat(reducedData);
      } else {
        // Handle the case where response.data is undefined or null
        console.error("Response data is missing or empty.");
      }
    } catch (error) {
      setError(error);
    }
  }

  // All names should start with a Capital letter surely - even that of a Pokey Thing? 
  const capName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  // Fetch data on load - similar to componentDidMount in Class components 
  useEffect(() => {
    fetchData()
  }, []) // [] ensures this only runs once

  // Simple loading/error display handlers for slow connections
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

 return (
  <div className="image-container">
    {data.map((item, index) => (
      <div key={index} className="pokemon-image-container">
        <Image
          src={`/sprites/${extractIdFromUrl(item.url)}.svg`}
          alt={item.name}
          className="pokemon-image zoom-image"
          width="100"
          height="100"
        />
        {/* Move the label outside of the container */}
        <div className="image-label-container">
          <div className="image-label">{item.name}</div>
        </div>
      </div>
    ))}
  </div>
  )     
}
