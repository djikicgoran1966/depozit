import { gql } from '@apollo/client'

export const  CREATEKARTICA = gql ` 
mutation CreateKartica( $naziv:String ) {
        createKartica( naziv:$naziv) {
            _id
            naziv
        }
}
`

export const  DELETEKARTICA = gql ` 
mutation DeleteKartica( $id:ID ) {
        deleteKartica( id:$id) {
            _id
            naziv
        }
}
`
export const  UPDATEKARTICA = gql ` 
mutation UpdateKartica($id:ID $naziv:String ) {
        updateKartica( id:$id naziv:$naziv) {
            _id
            naziv
        }
}
`