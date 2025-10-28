import 'server-only'

// This service accesses the Fuel API, which is a third-party service providing
// vehicle imagry and data.

// These DTOs represent the structure of data returned by the Fuel API.
export interface FuelVehicleDTO {
  id: number
  created: string
  modified: string
  trim: string
  num_doors: string
  year: number
  drivetype_desc: string
  make_name: string
  model_name: string
  drivetrain: string
  bodytype: string
}

export interface FuelMakeDTO {
  id: number
  created: string
  modified: string
  name: string // Capitalized make name
}

//
const baseURL = 'https://api.fuelapi.com/v1/json'
const API_KEY = process.env.FUEL_API_KEY

if (!API_KEY) {
  console.warn('FUEL_API_KEY is not set. FuelAPIService will not function.')
}

const baseHeaders = {
  'Content-Type': 'application/json',
}

/**
 * Generic fetch function for Fuel API
 * @param path - The API endpoint path
 * @param queryParams - An object representing query parameters
 * @param options - Additional fetch options
 */
async function fetchFromAPI<T>(
  path: string,
  queryParams?: Record<string, string>,
  options?: RequestInit
): Promise<T> {
  try {
    const url = `${baseURL}${path}?${new URLSearchParams({
      ...queryParams,
      api_key: API_KEY || '',
    }).toString()}`
    const defaultOptions = { method: 'GET', headers: baseHeaders, ...options }
    const res = await fetch(url, defaultOptions)

    if (!res.ok) {
      throw new Error(`Fuel API error: ${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching from Fuel API:', error)
    throw error
  }
}

/**
 * Lookup model years
 * @returns A list of model years available in the Fuel API
 */
const getModelYears = async (): Promise<number[]> => {
  const url = '/modelYears'

  try {
    const rawData = await fetchFromAPI(url)

    // Parse and validate the response
    if (!Array.isArray(rawData)) {
      throw new Error('Expected array response from Fuel API')
    }

    const years: number[] = rawData
      .filter((year) => year != '')
      .map((year) => parseInt(year, 10))

    // Validate that parsing was successful
    if (years.some((year) => isNaN(year))) {
      throw new Error('Failed to parse year field in Fuel API response')
    }

    return years
  } catch (error) {
    console.error('Error fetching model years from Fuel API:', error)
    throw error
  }
}

/**
 * Lookup makes for a given year
 * @returns A list of makes available for the specified year
 */
const getMakes = async (year: number): Promise<string[]> => {
  const url = '/makes'
  const queryParams = { year: year.toString() }

  try {
    const rawData = await fetchFromAPI(url, queryParams)

    // Parse and validate the response
    if (!Array.isArray(rawData)) {
      throw new Error('Expected array response from Fuel API')
    }

    const makes: string[] = rawData.map((item) => item.make_name)

    return makes
  } catch (error) {
    console.error('Error fetching makes from Fuel API:', error)
    throw error
  }
}

/**
 * Lookup models for a given year and make
 * @returns A list of models available for the specified year and make
 */
const getModels = async (year: number, make: string): Promise<string[]> => {
  const url = '/models'
  const queryParams = { year: year.toString(), make }

  try {
    const rawData = await fetchFromAPI(url, queryParams)

    // Parse and validate the response
    if (!Array.isArray(rawData)) {
      throw new Error('Expected array response from Fuel API')
    }

    const models: string[] = rawData.map((item) => item.model_name)

    return models
  } catch (error) {
    console.error('Error fetching models from Fuel API:', error)
    throw error
  }
}

/**
 * Lookup specific vehicle data
 * @param year - The model year of the vehicle
 * @param make - The manufacturer of the vehicle
 * @param model - The model name of the vehicle
 */
const getVehicleData = async (
  year: number,
  make: string,
  model: string
): Promise<FuelVehicleDTO[]> => {
  const url = '/vehicles'
  const queryParams = { year: year.toString(), make, model }

  try {
    const rawData = await fetchFromAPI(url, queryParams)

    // Parse and validate the response
    if (!Array.isArray(rawData)) {
      throw new Error('Expected array response from Fuel API')
    }

    const data: FuelVehicleDTO[] = rawData.map((item) => ({
      ...item,
      id: parseInt(item.id, 10),
      year: parseInt(item.year, 10),
    }))

    // Validate that parsing was successful
    if (data.some((item) => isNaN(item.id) || isNaN(item.year))) {
      throw new Error('Failed to parse numeric fields in Fuel API response')
    }

    return data
  } catch (error) {
    console.error('Error fetching vehicle data from Fuel API:', error)
    throw error
  }
}

// Lokup image shot url for a vehicle by id (get from vehicle data lookup)

export const FuelAPIService = {
  getModelYears,
  getMakes,
  getModels,
  getVehicleData,
}
