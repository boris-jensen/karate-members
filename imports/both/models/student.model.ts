import { CollectionObject } from './collection-object.model'
import { ClassSession } from './classSession.model'
import { Contact } from './contact.model'

export interface Student extends CollectionObject {
  name: string
  classes: string[]
  hasPaid: boolean
  sessions: ClassSession[]
  contacts: Contact[]
  birthdate: string
  active: boolean
}
