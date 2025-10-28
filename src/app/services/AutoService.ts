import { AutoActionResponse } from '@gql/AutoActionResponse'
import { AutoDTO } from '@gql/AutoDTO'

const API_URL = 'http://localhost:4000/graphql'

const baseHeaders = {
  'Content-Type': 'application/json',
}

/**
 * Generic function to perform GraphQL API fetches to the Auto service
 */
const autoApiFetch = async (query: string, variables?: object) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

/**
 * Fetches a single auto by ID from the API
 * @param id The ID of the auto to fetch
 * @returns A promise that resolves to an AutoDTO object or null if not found
 */
export const fetchAutoById = async (id: string): Promise<AutoDTO | null> => {
  const query = `#graphql
        query Auto($id: ID!) {
          auto(id: $id) {
            id
            make
            model
            year
            features
          }
        }`

  const res = await autoApiFetch(query, { id })
  return res.data.auto || null
}

/**
 * Fetches the list of autos from the API
 * @returns A promise that resolves to an array of AutoDTO objects
 */
export const fetchAutos = async (): Promise<AutoDTO[]> => {
  const query = `#graphql
        query Query {
          autos {
            id
            make
            model
            year
            features
          }
        }`

  const res = await autoApiFetch(query)
  return res.data.autos
}

/**
 * Adds a new auto to the API
 * @param auto Auto data without ID
 * @returns A promise that resolves to the AutoActionResponse
 */
export const addAuto = async (
  auto: Omit<AutoDTO, 'id'>
): Promise<AutoActionResponse> => {
  const res = await autoApiFetch(
    `#graphql
    mutation Mutation($make: String!, $model: String!, $year: Int!, $features: [String]) {
      addAuto(make: $make, model: $model, year: $year, features: $features) {
        message
        success
      }
    }`,
    auto
  )
  return res.data.addAuto
}

/**
 * Deletes an auto by ID
 * @param id The ID of the auto to delete
 * @returns A promise that resolves to the AutoActionResponse
 */
export const deleteAuto = async (id: string): Promise<AutoActionResponse> => {
  const query = `#graphql
    mutation Mutation($id: ID!) {
      deleteAuto(id: $id) {
        message
        success
      }
    }`

  const response = await autoApiFetch(query, { id })
  return response.data.deleteAuto
}

/**
 * Updates an existing auto by ID
 * @param id The ID of the auto to update
 * @param auto Updated auto data without ID
 * @returns A promise that resolves to the AutoActionResponse
 */
export const updateAuto = async (
  auto: AutoDTO
): Promise<AutoActionResponse> => {
  const query = `#graphql
    mutation UpdateAuto($id: ID!, $make: String!, $model: String!, $year: Int!, $features: [String]) {
      updateAuto(id: $id, make: $make, model: $model, year: $year, features: $features) {
        message
        success
      }
    }`

  const response = await autoApiFetch(query, auto)
  return response.data.updateAuto
}
