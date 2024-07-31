import PetCard from "./pet-card";

export default function PetList({ listOfPets }) {
  return (
    <div>
      {listOfPets.map((pet) => (
        <div>
          <PetCard dogObj={pet} />
        </div>
      ))}
    </div>
  );
}
