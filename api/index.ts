import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { AutoActionResponse } from '@gql/AutoActionResponse'
import { AutoDTO } from '@gql/AutoDTO'
import { randomUUID } from 'node:crypto'

/**
 * For demonstration purposes, we'll use an in-memory array to store autos.
 * In a real application, this would interface with a database.
 */

const typeDefs = `#graphql
  type Auto {
    id: ID
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
    auto(id: ID!): Auto
    autos: [Auto]
  }

  type Mutation {
    addAuto(make: String!, model: String!, year: Int!, features: [String]): AutoResponse
    deleteAuto(id: ID!): AutoResponse
    updateAuto(id: ID!, make: String!, model: String!, year: Int!, features: [String]): AutoResponse
  }
`

const autos: AutoDTO[] = [
  {
    id: randomUUID(),
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    features: ['Bluetooth', 'Backup Camera'],
  },
  {
    id: randomUUID(),
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    features: ['Sunroof', 'Leather Seats'],
  },
]

const addAuto = (
  _: never,
  { make, model, year, features }: AutoDTO
): AutoActionResponse => {
  autos.push({ id: randomUUID(), make, model, year, features })
  return {
    success: true,
    message: 'Auto added successfully',
  }
}

const deleteAuto = (_: never, { id }: { id: string }): AutoActionResponse => {
  const index = autos.findIndex((auto) => auto.id === id)
  if (index === -1) {
    return {
      success: false,
      message: 'Auto not found',
    }
  }
  autos.splice(index, 1)
  return {
    success: true,
    message: 'Auto deleted successfully',
  }
}

const updateAuto = (
  _: never,
  { id, make, model, year, features }: AutoDTO
): AutoActionResponse => {
  const auto = autos.find((auto) => auto.id === id)
  if (!auto) {
    return {
      success: false,
      message: 'Auto not found',
    }
  }
  auto.make = make
  auto.model = model
  auto.year = year
  auto.features = features
  return {
    success: true,
    message: 'Auto updated successfully',
  }
}

const resolvers = {
  Query: {
    auto: (_: never, { id }: { id: string }) => autos.find((a) => a.id === id),
    autos: () => autos,
  },
  Mutation: {
    addAuto,
    deleteAuto,
    updateAuto,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Start the server
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`)
})
