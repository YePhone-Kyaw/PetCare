import PetCard from "@/app/_components/pet-card";

export default function PetList({ listOfPets }) {
  return (
    <div>
      {listOfPets.map((pet) => (
        <div key={pet.id}>
          <PetCard dogObj={pet} />
        </div>
      ))}
    </div>
  );
}
