import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "./persons/graphql-mutations";
import { ALL_PERSONS } from "./persons/graphql-queries";

/* Aquí lo que pasa es que si en la mutation le pido que me devuelva el id la caché de apollo client va a ver que hay un cambio y por ello se va a actualizar si no le pido que me traiga la id no detecta el cambio y por ello no refresca y tendría que usar un refetchQueries como en el caso de la PersonForm */

/*useMutation la constante es un arreglo de dos posiciones porque la primera es el nombre de la función y la segunda posición es el resultado de la mutación "result"
La función entonces tiene un objeto con propiedades entre las que están las variables que se pasan a través de un objeto. 
*/

export const PhoneForm = ({ notifyError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.log("Person not found");
      notifyError("Person not found");
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({
      variables: { name, phone },
    });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Edit Phone Number</h2>
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

        <button>Save Changes</button>
      </form>
    </div>
  );
};
