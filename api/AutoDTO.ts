import { UUID } from 'node:crypto'

export interface AutoDTO {
  id?: UUID
  make: string
  model: string
  year: number
  features: string[]
}
