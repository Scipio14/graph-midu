import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
/* 
  useLazyQuery va a esperar a que pase algo para poder renderizarse. 
  Mientras que useQuery hace la petición cuando se renderiza, lazy la hace cuando se le pide
  const [getPerson,result] = useLazyQuery(FIND_PERSON);
  nos devuelve un array de 2 posiciones en el que la primera es la llamada, cuando queremos activar la consulta  y la segunda es el resultado.
  A la llamada (getPersons en este caso) hay que pasarle unas variables dentro de un objeto para que haga la consulta
*/

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      address {
        street
        city
      }
    }
  }
`;

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);
  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}, {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button
          onClick={() => {
            setPerson(null);
            document.location.reload();
          }}
        >
          close
        </button>
      </div>
    );
  }

  if (persons === null) return null;
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div
          key={p.id}
          onClick={() => {
            showPerson(p.name);
          }}
        >
          {p.name} - {p.phone}
        </div>
      ))}
    </div>
  );
};

export default Persons;
