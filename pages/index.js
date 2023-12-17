import React, { useState, useEffect } from 'react'
import 'typeface-roboto'
import { apiBuilder } from "./api/api"

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

  // All names should start with a Capital letter surely - even that of a PThing? 
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
    <div>
      <h3>List of first {pokeLimit} Pokemons</h3>
      (Click a name to reveal more details)
      <br/>
      <br/>
      <ul>
        {data.map((item, index) => ( // map through the results and display as unstyled list
          <li key={index} style={{ cursor: 'pointer' }} onClick={() => handleItemClick(extractIdFromUrl(item.url))}> 
          {/* an onCLick call to get stats/types */}
          <span className="index">{index + 1}.</span> {capName(item.name)}
          
          {selectedItem === extractIdFromUrl(item.url) && (
            <div>
              <br/>
              <hr/>
              <div><strong>Stats:</strong> {JSON.stringify(stat.stats)}</div> {/* stringified as I've no idea what to do with this info as yet*/}
                <hr/>
                <div><strong>Types:</strong> {JSON.stringify(stat.types)}</div>
                <hr/>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
