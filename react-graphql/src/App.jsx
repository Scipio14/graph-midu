import React, { useState } from "react";
import Persons from "./Persons";
import { Notify } from "./Notify";
import logo from "./logo.svg";
import "./App.css";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { usePersons } from "./persons/custom-hooks";
import { PersonForm } from "./PersonForm";
import { PhoneForm } from "./PhoneForm";

/* se usa pollInterval en la useQuery para decirle a la UI que haga peticiones cada cierto tiempo para ver si hay nuevos datos y que los devuelva. Esto lo malo es que hace peticiones cada x segundos, que puede ser interesante en aplicaciones como AirBnB para que se actualice la disponibilidad de las habitaciones pero hace más fetch de lo necesario
Otra estrategia sería exportar la query ALL_PERSONS y utilizarla donde estamos mutando en el useMutation como un arreglo de queries dentro de un objeto en la useMutation
*/

const App = () => {
  /*const { data, error, loading } = useQuery(
    ALL_PERSONS
    {
    pollInterval: 2000,
  }
  );*/
  //console.log(data.allPersons);

  const { data, loading, error } = usePersons();
  const [errorMessage, setErrorMessage] = useState(null);
  if (error) return <span style="color:red">{error}</span>;

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <header className="App-header">
        <img src={logo} alt="logo react" className="App-logo" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>GraphQL + React</h1>
            <Persons persons={data?.allPersons} />
          </>
        )}
        <PersonForm notifyError={notifyError} />
        <PhoneForm notifyError={notifyError} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </header>
    </div>
  );
};

export default App;
