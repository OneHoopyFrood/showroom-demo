'use client'

import { AutoDTO } from '@api/AutoDTO'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import AutoCard from '../../components/AutoCard'
import { fetchAutoById } from '../../services/AutoService'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ShowroomPage({ params }: PageProps) {
  const [auto, setAuto] = useState<AutoDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const { id: autoId } = use(params)

  useEffect(() => {
    const loadAuto = async () => {
      if (!autoId) return

      try {
        const auto = await fetchAutoById(autoId)
        setAuto(auto || null)
        setLoading(false)
      } catch (error) {
        console.error('Error loading auto:', error)
      }
    }

    loadAuto()
  }, [autoId])

  if (!autoId) {
    return (
      <div className="flex items-center justify-center min-h-1/2">
        <div className="text-center">
          <h1 className="text-xl">Please select a vehicle to view</h1>
          <p>
            <Link href="/" className="text-blue-500">
              Go back to showroom
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (!auto) {
    return (
      <div className="flex items-center justify-center min-h-1/2">
        <div className="text-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-xl">Auto not found</h1>
              <p>
                <Link href="/" className="text-blue-500">
                  Go back to showroom
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <AutoCard auto={auto} />
      </div>
    </div>
  )
}
