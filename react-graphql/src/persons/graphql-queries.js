import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
  {
    allPersons {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`;
