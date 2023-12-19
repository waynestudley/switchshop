import React, { useState, useEffect } from "react";
import "typeface-roboto";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/pokemon");
      if (response.ok) {
        const pokemonData = await response.json();
        setData(pokemonData);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="image-container">
      {data.map((item, index) => (
        <div key={index} className="pokemon-image-container">
          <Image
            src={`/sprites/${item.id}.svg`}
            alt={item.name}
            className="pokemon-image zoom-image"
            width="100"
            height="100"
          />
          <div className="image-label-container">
            <div className="image-label">{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
