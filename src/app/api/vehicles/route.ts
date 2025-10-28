import { NextRequest, NextResponse } from 'next/server'
import { FuelAPIService } from '../../services/FuelAPIService'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const year = searchParams.get('year')
  const make = searchParams.get('make')
  const model = searchParams.get('model')

  if (!year || !make || !model) {
    return NextResponse.json(
      { error: 'Missing required parameters: year, make, model' },
      { status: 400 }
    )
  }

  try {
    const vehicles = await FuelAPIService.getVehicleData(
      parseInt(year, 10),
      make,
      model
    )
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicle data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle data' },
      { status: 500 }
    )
  }
}
