import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_PERSON } from "./persons/graphql-mutations";
import { ALL_PERSONS } from "./persons/graphql-queries";

/* Se puede llevar a cabo un manejo de errores en la useMutation*/

export const PersonForm = ({ notifyError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (err) => {
      notifyError(err.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createPerson({
      variables: { name, phone, street, city },
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>Create new Person</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          value={street}
          placeholder="Street"
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <button>Add Persons</button>
      </form>
    </div>
  );
};
