import { gql } from '@apollo/client'

export const  CREATEOZNAKA = gql ` 
mutation CreateOznaka( $naziv:String ) {
        createOznaka( naziv:$naziv) {
            _id
            naziv
        }
}
`

export const  DELETEOZNAKA = gql ` 
mutation DeleteOznaka( $id:ID ) {
        deleteOznaka( id:$id) {
            _id
            naziv
        }
}
`
export const  UPDATEOZNAKA = gql ` 
mutation UpdateOznaka($id:ID $naziv:String ) {
        updateOznaka( id:$id naziv:$naziv) {
            _id
            naziv
        }
}
`