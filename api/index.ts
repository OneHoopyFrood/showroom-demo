import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Car {
    make: String
    model: String
    year: Int
    features: [String]
  }

  type CarResponse {
    success: Boolean
    message: String
  }

  type Query {
    cars: [Car]
  }

  type Mutation {
    addCar(make: String!, model: String!, year: Int!, features: [String]): CarResponse
  }
`;

const cars = [
  {
    make: "Honda",
    model: "Civic",
    year: 2022,
    features: ["Bluetooth", "Backup Camera"],
  },
];

const resolvers = {
  Query: {
    cars: () => cars,
  },
  Mutation: {
    
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
