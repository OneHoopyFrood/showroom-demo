'use client'

import { AutoDTO } from '@api/AutoDTO'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ActionButton } from '../components/ActionButton'
import {
  addAuto,
  deleteAuto,
  fetchAutos,
  updateAuto,
} from '../services/AutoService'
import { AutoAddEditModal } from './AutoAddEditModal'

export default function Page() {
  const [autos, setAutos] = useState<AutoDTO[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [maybeAuto, setMaybeAuto] = useState<AutoDTO | undefined>(undefined)

  useEffect(() => {
    ;(async () => {
      setAutos(await fetchAutos())
    })()
  }, [])

  const handleAddEditAuto = async (auto: AutoDTO) => {
    try {
      const action = auto.id ? updateAuto : addAuto
      const result = await action(auto)
      if (result.success) {
        alert(`Auto ${auto.id ? 'updated' : 'added'} successfully!`)
        setAutos(await fetchAutos()) // Refresh the list
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      alert(
        `Error: ${
          error instanceof Error ? error.message : 'Unknown error occurred'
        }`
      )
    }
  }

  const handleDeleteAuto = async (auto: AutoDTO) => {
    try {
      if (!auto.id) {
        throw new Error('Auto ID is missing')
      }
      const result = await deleteAuto(auto.id)
      if (result.success) {
        alert(`${auto.year} ${auto.make} ${auto.model} deleted`)
        setAutos(await fetchAutos()) // Refresh the list
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      alert(
        `Error: ${
          error instanceof Error ? error.message : 'Unknown error occurred'
        }`
      )
    }
  }

  return (
    <div className="flex flex-col items-start justify-center mt-20 w-2/3">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <table className="w-full [&_th,&_td]:border-gray-700 [&_th,&_td]:border-b [&_th]:text-left">
        <thead>
          <tr>
            <th className="w-0"></th>
            <th>Model</th>
            <th>Make</th>
            <th>Year</th>
            <th>Features</th>
            <th>Showroom page</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => (
            <tr key={auto.id}>
              <td>
                <div className="flex items-center pr-2">
                  <ActionButton
                    type="delete"
                    onClick={() => {
                      if (!auto.id) {
                        throw new Error('Auto ID is missing')
                      }
                      handleDeleteAuto(auto)
                    }}
                    ariaLabel={`Delete ${auto.make} ${auto.model}`}
                  />
                  <ActionButton
                    type="edit"
                    onClick={() => {
                      setMaybeAuto(auto)
                      setIsModalOpen(true)
                    }}
                    ariaLabel={`Edit ${auto.make} ${auto.model}`}
                  />
                </div>
              </td>
              <td>{auto.make}</td>
              <td>{auto.model}</td>
              <td>{auto.year}</td>
              <td>
                <ul className="list-disc list-inside">
                  {auto.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Link href={`/showroom/${auto.id}`} className="text-blue-500">
                  View in Showroom
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="py-4 border-none">
              <ActionButton
                type="add"
                onClick={() => {
                  setMaybeAuto(undefined)
                  setIsModalOpen(true)
                }}
                ariaLabel="Add New Auto"
              >
                Add a new auto
              </ActionButton>
            </td>
          </tr>
        </tfoot>
      </table>
      <AutoAddEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setMaybeAuto(undefined)
        }}
        onSubmit={handleAddEditAuto}
        auto={maybeAuto}
      />
    </div>
  )
}
