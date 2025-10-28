'use client'

import { AutoDTO } from '@gql/AutoDTO'
import { useEffect, useState } from 'react'

interface AutoFormProps {
  onSubmit: (auto: AutoDTO) => Promise<void>
  onCancel: () => void
  auto?: AutoDTO
  availableYears: number[]
}

interface FormData extends AutoDTO {
  makes: string[]
  models: string[]
}

const blankFormData: FormData = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  features: [],
  makes: [],
  models: [],
}

export function AutoForm({
  onSubmit,
  onCancel,
  auto,e
  availableYears,
}: AutoFormProps) {
  const [formData, setFormData] = useState<FormData>(
    auto
      ? { ...auto, makes: [], models: [] }
      : {
          ...blankFormData,
          yar: availableYears[0] || new Date().getFullYear(),
        }
  )

  useEffect(() => {
    if (auto) {
      setFormData({
        ...auto,
        makes: [],
        models: [],
      })
      // If we're editing, fetch the available makes and models for the selected year/make
      fetchMakes(auto.year)
      if (auto.make) {
        fetchModels(auto.year, auto.make)
      }
    } else {
      // For new autos, fetch makes for the first available year
      fetchMakes(availableYears[0] || new Date().getFullYear())
    }
  }, [auto, availableYears])

  const fetchMakes = async (year: number) => {
    try {
      const response = await fetch(`/api/vehicles/makes?year=${year}`)
      const makes = await response.json()
      setFormData((prev) => ({
        ...prev,
        makes,
        make: '',
        model: '',
        models: [],
      }))
    } catch (error) {
      console.error('Error fetching makes:', error)
    }
  }

  const fetchModels = async (year: number, make: string) => {
    try {
      const response = await fetch(
        `/api/vehicles/models?year=${year}&make=${make}`
      )
      const models = await response.json()
      setFormData((prev) => ({ ...prev, models, model: '' }))
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { makes, models, ...autoData } = formData
    await onSubmit(autoData)
  }

  const handleYearChange = async (year: number) => {
    setFormData((prev) => ({
      ...prev,
      year,
      make: '',
      model: '',
      makes: [],
      models: [],
    }))
    await fetchMakes(year)
  }

  const handleMakeChange = async (make: string) => {
    setFormData((prev) => ({
      ...prev,
      make,
      model: '',
      models: [],
    }))
    await fetchModels(formData.year, make)
  }

  const inputClassName =
    'mt-2 py-1 px-2 block w-full rounded-sm bg-gray-700 border-gray-300 shadow-sm text-gray-100'
  const disabledClassName =
    'mt-2 py-1 px-2 block w-full rounded-sm bg-gray-800 border-gray-700 shadow-sm text-gray-400 cursor-not-allowed'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="year" className="block text-sm font-medium">
          Year
        </label>
        <select
          id="year"
          value={formData.year}
          onChange={(e) => handleYearChange(parseInt(e.target.value))}
          className={inputClassName}
          required
        >
          <option value="">Select Year</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="make" className="block text-sm font-medium">
          Make
        </label>
        <select
          id="make"
          value={formData.make}
          onChange={(e) => handleMakeChange(e.target.value)}
          className={formData.makes.length ? inputClassName : disabledClassName}
          disabled={!formData.makes.length}
          required
        >
          <option value="">Select Make</option>
          {formData.makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium">
          Model
        </label>
        <select
          id="model"
          value={formData.model}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, model: e.target.value }))
          }
          className={
            formData.models.length ? inputClassName : disabledClassName
          }
          disabled={!formData.models.length}
          required
        >
          <option value="">Select Model</option>
          {formData.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="features" className="block text-sm font-medium">
          Features (comma-separated)
        </label>
        <input
          type="text"
          id="features"
          value={formData.features.join(', ')}
          onChange={(e) =>
            setFormData({
              ...formData,
              features: e.target.value
                .split(',')
                .map((f) => f.trim())
                .filter(Boolean),
            })
          }
          className={inputClassName}
          placeholder="Leather seats, Navigation, Sunroof"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium bg-gray-800 border border-gray-300 rounded-md hover:bg-gray-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          {auto ? 'Save Changes' : 'Add Auto'}
        </button>
      </div>
    </form>
  )
} 
