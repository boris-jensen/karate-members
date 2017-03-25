import { ClassSession } from './classSession.model'
import { Contact } from './contact.model'

export interface Student {
  name: string
  _id?: string
  classes: string[]
  hasPaid: boolean
  sessions: ClassSession[]
  contacts: Contact[]
  birthdate: string
}
