import { FuelAPIService } from '@/app/services/FuelAPIService'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')

  if (!year) {
    return NextResponse.json(
      { error: 'Year parameter is required' },
      { status: 400 }
    )
  }

  const makes = await FuelAPIService.getMakes(parseInt(year))
  return NextResponse.json(makes)
}
