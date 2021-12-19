import { ApolloServer, UserInputError, gql } from "apollo-server";
import { v1 as uuid } from "uuid";

const persons = [
  {
    name: "Midu",
    phone: "55-8579-6325",
    street: "Calle Frontend",
    city: "Barcelona",
    age: 18,
    id: "1",
  },
  {
    name: "Pedro",
    phone: "55-2088-7932",
    street: "Calle Mariana",
    city: "Mataró",
    age: 17,
    id: "2",
  },
  {
    name: "María",
    phone: "66-2088-7932",
    street: "Calle Pedos",
    city: "Chirona",
    age: 23,
    id: "3",
  },
  {
    name: "Dapelu",
    phone: "044-12345",
    street: "Calle Popo",
    city: "Chirona",
    age: 25,
    id: "4",
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    age: Int!
    address: Address!
    id: ID!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    allPersons: (root, args) => {
      if (!args.phone) return persons;

      const byPhone = (person) =>
        args.phone === "YES" ? person.phone : !person.phone;

      return persons.filter(byPhone);
    },
    personCount: () => persons.length,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      //const {name,phone,street,city} = args
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex((p) => p.name === args.name);
      if (personIndex === -1) return null;

      const person = persons[personIndex];
      const updatedPerson = { ...person, phone: args.phone };
      persons[personIndex] = updatedPerson;
      return updatedPerson;
    },
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server
  .listen({
    port: 1414,
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

/* En un resolver podemo cambiar el nombre de alguno de los campos de nuestro modelo de schema de tal manera que si yo no quiero que se llame el campo name se lo puedo modificar para que aparezca con otro nombre*/
