"use client";

import React from "react";

export default function PetCard({ petObj, petType, onFavorite }) {
  const { url, breeds } = petObj;
  const breed = breeds && breeds.length > 0 ? breeds[0] : null;
  const name = breed ? breed.name : "Unknown Breed";
  const age = breed ? breed.age : "Unknown";
  const weight = breed ? breed.weight.metric : "Unknown";

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite({ ...petObj, type: petType });
    }
    console.log(`Added ${name} to favorites`);
  };

  return (
    <div className="border border-hover-style bg-navigation m-1 p-2 rounded-lg">
      {url ? (
        <img
          className="w-full h-60 object-cover border-2 border-cyan-900 rounded-md"
          src={url}
          alt={name}
        />
      ) : (
        <div className="w-full h-60 flex items-center justify-center bg-gray-300 rounded-md">
          No Image Available
        </div>
      )}
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold mt-2">Name: {name}</h3>
          <p>Age: {age}</p>
          <p>Weight: {weight} kg</p>
        </div>

        <button
          onClick={handleFavorite}
          className="mt-2  hover:text-red-600 text-font-color font-bold py-2 px-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={20}
            height={20}
            className="fill-current"
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
