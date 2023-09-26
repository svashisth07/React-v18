import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      <h2>Results</h2>
      {pets.length > 0 ? (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      ) : (
        <h2>No Pets Found</h2>
      )}
    </div>
  );
};

export default Results;
