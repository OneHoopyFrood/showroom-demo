'use client'

import { AutoDTO } from '@api/AutoDTO'
import { useEffect, useState } from 'react'

interface AutoAddModalProps {
  onClose: () => void
  onSubmit: (auto: AutoDTO) => Promise<void>
  isOpen: boolean
  auto?: AutoDTO
}

const blankAuto: AutoDTO = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  features: [],
}

export function AutoAddEditModal({
  onClose,
  onSubmit,
  isOpen,
  auto,
}: AutoAddModalProps) {
  const [formData, setFormData] = useState<AutoDTO>(
    Object.assign({}, blankAuto)
  )

  // Update with the prop
  useEffect(() => {
    if (auto) {
      setFormData(auto)
    } else {
      setFormData(Object.assign({}, blankAuto))
    }
  }, [auto])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    onClose()
  }

  const inputClassName =
    'mt-2 py-1 px-2 block w-full rounded-sm bg-gray-700 border-gray-300 shadow-sm text-gray-100'

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-gray-800 text-gray-50 p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {auto ? 'Edit Auto' : 'Add New Auto'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="make" className="block text-sm font-mediu">
              Make
            </label>
            <input
              type="text"
              id="make"
              value={formData.make}
              onChange={(e) =>
                setFormData({ ...formData, make: e.target.value })
              }
              className={inputClassName}
              required
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium">
              Model
            </label>
            <input
              type="text"
              id="model"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className={inputClassName}
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium">
              Year
            </label>
            <input
              type="number"
              id="year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              className={inputClassName}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
            />
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
              onClick={onClose}
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
      </div>
    </div>
  )
}
