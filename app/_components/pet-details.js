
"use client";

import { useState, useEffect } from "react";
import PetCard from "@/app/_components/pet-card";
import NavBar from "@/app/_components/navbar";
import Footer from "./footer";
import { useUserAuth } from "../_utils/auth-context";

export default function PetDetails() {
  const [pets, setPets] = useState([]);
  const [petType, setPetType] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [page, setPage] = useState(0);

  const user = useUserAuth() || {};

  const dogApiKey =
    "live_x2lm6KZ978HFQv41YmBJnvMaMTDqszF22sKenKKsx9ZHOP6RIEhOM0K4lR9gNGRm";
  const catApiKey =
    "live_YrE8x5uXvbxtaJCbjl6L2oC86R7gwBtYbQhBQ6Q31MexncZ5XKCDlf5wj3P8Mhj1";

  async function fetchBreeds() {
    try {
      const apiUrl =
        petType === "dog"
          ? `https://api.thedogapi.com/v1/breeds`
          : `https://api.thecatapi.com/v1/breeds`;

      const response = await fetch(apiUrl, {
        headers: {
          "x-api-key": petType === "dog" ? dogApiKey : catApiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.log(`Error fetching breeds: ${error.message}`);
    }
  }

  async function fetchPets() {
    try {
      const apiUrl =
        petType === "dog"
          ? `https://api.thedogapi.com/v1/images/search?limit=10&page=${page}&breed_ids=${selectedBreed}`
          : `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&breed_ids=${selectedBreed}`;

      const response = await fetch(apiUrl, {
        headers: {
          "x-api-key": petType === "dog" ? dogApiKey : catApiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPets((prevPets) => [...prevPets, ...data]);
    } catch (error) {
      console.log(`Error fetching pets: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchBreeds();
  }, [petType]);

  useEffect(() => {
    setPets([]);
    setPage(0);
    fetchPets();
  }, [petType, selectedBreed]);

  useEffect(() => {
    fetchPets();
  }, [page]);

  const addToFavorites = (pet) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((favPet) => favPet.id === pet.id)) {
        return [...prevFavorites, pet];
      }
      return prevFavorites;
    });
  };

  const handlePetTypeChange = (type) => {
    setPetType(type);
    setSelectedBreed("");
  };

  const handleSetSelectedBreed = (event) => {
    setSelectedBreed(event.target.value);
  };


  return (
    <main className="flex flex-col min-h-screen text-font-color">
      <div className=" flex flex-col bg-main-background" >
      <NavBar />
            {user ? (
        <div>
            <div className="flex justify-center mb-4">
          <button onClick={() => handlePetTypeChange("dog")} className="p-5 text-font-color hover:bg-hover-style bg-navigation/30 rounded-full border border-font-color">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width={100}
              height={100}
              className="fill-current"
            >
              <path d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32l52.1 0c12.7 0 24.9 5.1 33.9 14.1L496 64l56 0c13.3 0 24 10.7 24 24l0 24c0 44.2-35.8 80-80 80l-32 0-16 0-21.3 0-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-115.2c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2L160 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-230.2c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192l30 0 16 0 159.8 0L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z" />
            </svg>
          </button>
          <button onClick={() => handlePetTypeChange("cat")} className="p-5 text-font-color hover:bg-hover-style bg-navigation/30 rounded-full border border-font-color">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width={100}
              height={100}
              className="fill-current"
            >
              <path d="M320 192l17.1 0c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4l0 4 0 32 0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-140.8L280 448l56 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-144 0c-53 0-96-43-96-96l0-223.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3l0 85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5s0 0 0 0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32c0 0 0 0 0 0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128c0 0 0 0 0 0l0-96 0-20 0-1.3C352 4.8 356.7 .1 362.6 0l.2 0c3.3 0 6.4 1.6 8.4 4.2c0 0 0 0 0 .1L384 21.3l27.2 36.3L416 64l64 0 4.8-6.4L512 21.3 524.8 4.3c0 0 0 0 0-.1c2-2.6 5.1-4.2 8.4-4.2l.2 0C539.3 .1 544 4.8 544 10.7l0 1.3 0 20 0 96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
            </svg>
          </button>
        </div>
        <select value={selectedBreed} onChange={handleSetSelectedBreed}>
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              petObj={pet}
              petType={petType}
              onFavorite={addToFavorites}
            />
          ))}
        </div>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="mt-4"
        >
          Load More
        </button>
        <h2 className="text-2xl font-bold mt-4">Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((pet) => (
            <PetCard key={pet.id} petObj={pet} petType={pet.type} />
          ))}
        </div>
        </div>

            ) : null}
        
      </div>
       
      <Footer />
    </main>
  );
}
