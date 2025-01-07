import { type SchemaTypeDefinition } from 'sanity'
import {Blogs} from './Blogs'
import { Comments } from './userComments'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Blogs,Comments],
}
