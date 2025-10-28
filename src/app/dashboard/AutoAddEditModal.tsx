import { AutoDTO } from '@gql/AutoDTO'
import { AutoForm } from './AutoForm'

interface AutoAddModalProps {
  onClose: () => void
  onSubmit: (auto: AutoDTO) => Promise<void>
  isOpen: boolean
  auto?: AutoDTO
  availableYears: number[]
}

export function AutoAddEditModal({
  onClose,
  onSubmit,
  isOpen,
  auto,
  availableYears,
}: AutoAddModalProps) {
  return !isOpen ? null : (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-gray-800 text-gray-50 p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {auto ? 'Edit Auto' : 'Add New Auto'}
        </h2>
        <AutoForm
          onSubmit={async (data) => {
            onClose()
            onSubmit(data)
          }}
          onCancel={onClose}
          auto={auto}
          availableYears={availableYears}
        />
      </div>
    </div>
  )
}
