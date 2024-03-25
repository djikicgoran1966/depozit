import { gql } from '@apollo/client'

export const OZNAKE=gql `
{ 
oznake { 
 _id
  naziv
}
}
`