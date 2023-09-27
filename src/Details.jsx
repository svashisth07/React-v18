import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContect";

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery(["details", id], fetchPet);

  const pet = data?.pets[0];

  return (
    <div className="details">
      <Carousel images={pet?.images} />
      <div>
        <h1>{pet?.name}</h1>
        <h2>
          {pet?.animal} - {pet?.breed} - {pet?.city}, {pet?.state}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet?.name}</button>
        <p>{pet?.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet?.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
