import { Suspense } from 'react'
import { fetchAutos } from '../services/AutoService'
import { FuelAPIService } from '../services/FuelAPIService'
import { AutoTable } from './AutoTable'

export default async function Page() {
  const [autos, years] = await Promise.all([
    fetchAutos(),
    FuelAPIService.getModelYears(),
  ])

  return (
    <div className="flex flex-col items-start justify-center mt-20 w-2/3">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AutoTable initialAutos={autos} availableYears={years} />
      </Suspense>
    </div>
  )
}
