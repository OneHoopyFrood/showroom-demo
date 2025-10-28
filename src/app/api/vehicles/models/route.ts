import { FuelAPIService } from '@/app/services/FuelAPIService'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const make = searchParams.get('make')

  if (!year || !make) {
    return NextResponse.json(
      { error: 'Year and make parameters are required' },
      { status: 400 }
    )
  }

  const models = await FuelAPIService.getModels(parseInt(year), make)
  return NextResponse.json(models)
}
