import { AutoDTO } from "@api/AutoDTO";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { randomUUID } from "node:crypto";

const typeDefs = `#graphql
  type Auto {
    id: UUID
    make: String
    model: String
    year: Int
    features: [String]
  }

  type AutoResponse {
    success: Boolean
    message: String
  }

  type Query {
    autos: [Auto]
  }

  type Mutation {
    addAuto(make: String!, model: String!, year: Int!, features: [String]): AutoResponse
  }
`;

const autos: AutoDTO[] = [
  {
    id: randomUUID(),
    make: "Honda",
    model: "Civic",
    year: 2022,
    features: ["Bluetooth", "Backup Camera"],
  },
  {
    id: randomUUID(),
    make: "Toyota",
    model: "Camry",
    year: 2021,
    features: ["Sunroof", "Leather Seats"],
  },
];

const resolvers = {
  Query: {
    autos: () => autos,
  },
  Mutation: {
    addAuto: (_: never, { make, model, year, features }: AutoDTO) => {
      autos.push({ id: randomUUID(), make, model, year, features });
      return {
        success: true,
        message: "Auto added successfully",
      };
    } 
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
