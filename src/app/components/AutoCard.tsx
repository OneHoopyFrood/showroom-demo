import { AutoDTO } from '@gql/AutoDTO'
import Image from 'next/image'

interface AutoCardProps {
  auto: AutoDTO
}

export default function AutoCard({ auto }: AutoCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <div className="w-full bg-gray-700 mb-4">
        <Image
          src={`https://placehold.co/400x250/transparent/d1d5dc/png?text=${auto.make}\\n${auto.model}`}
          alt={`${auto.make} ${auto.model}`}
          width={400}
          height={250}
          className="w-full h-full object-cover rounded bg-gray-600"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        {auto.year} {auto.make} {auto.model}
      </h2>
      <h4>Features</h4>
      <hr />
      <ul className="mt-2 text-gray-300 text-sm space-y-1 list-disc list-inside">
        {auto.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}
