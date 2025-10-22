'use client'

import { AutoDTO } from '@api/AutoDTO'
import { useEffect, useState } from 'react'
import { ActionButton } from '../components/ActionButton'
import { AutoAddModal } from '../components/AutoAddModal'
import { addAuto, fetchAutos } from '../services/AutoService'

export default function Page() {
  const [autos, setAutos] = useState<AutoDTO[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      setAutos(await fetchAutos())
    })()
  }, [])

  const handleAddAuto = async (auto: Omit<AutoDTO, 'id'>) => {
    try {
      const result = await addAuto(auto)
      if (result.success) {
        alert('Auto added successfully!')
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
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => (
            <tr key={auto.id}>
              <td>
                <div className="flex items-center pr-2">
                  <ActionButton
                    type="delete"
                    onClick={async () => {
                      // TODO: replace with real delete handler (call API, update state)
                      console.log('delete', auto.id)
                    }}
                    ariaLabel={`Delete ${auto.make} ${auto.model}`}
                  />
                  <ActionButton
                    type="edit"
                    onClick={() => {
                      // TODO: replace with real edit handler (open form/modal or navigate)
                      console.log('edit', auto.id)
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
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="py-4 border-none">
              <ActionButton
                type="add"
                onClick={() => setIsAddModalOpen(true)}
                ariaLabel="Add New Auto"
              >
                Add a new auto
              </ActionButton>
              <AutoAddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddAuto}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
