import { gql } from '@apollo/client'

export const ITEMS=gql `
{ 
items { 
 _id
  naziv
  datum
  price
}
}
`