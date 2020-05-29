import { gql } from 'apollo-server-lambda'

// TypeScript def
export interface Vehicle {
  numberPlate: string;
  color: string;
  numberOfPassengers: number;
}

export const typeDefs = gql`
  type Query {
    vehicle(numberPlate: String!): Vehicle
    vehicles: [Vehicle]
  }

  type Mutation {
    changeVehicleColor(
      numberPlate: String!
      newColor: String
    ): Vehicle!
  }

  type Subscription {
    vehicle(numberPlate: String!): Vehicle
  }

  type Vehicle {
    numberOfPassengers: Int
    numberPlate: String!
    color: String
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`
