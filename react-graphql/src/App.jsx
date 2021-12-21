import Persons from "./Persons";
import logo from "./logo.svg";
import "./App.css";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { usePersons } from "./persons/custom-hooks";
import { PersonForm } from "./PersonForm";

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
  if (error) return <span style="color:red">{error}</span>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo react" className="App-logo" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>GraphQL + React</h1>
            <Persons persons={data.allPersons} />
          </>
        )}
        <PersonForm />
      </header>
    </div>
  );
};

export default App;
