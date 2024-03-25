import { gql } from '@apollo/client'

export const  CREATEITEM = gql ` 
mutation CreateItem( $naziv:String, $datum:String, $price:String ) {
        createItem( naziv:$naziv, datum:$datum, price:$price) {
            _id
            naziv
            datum
            price
        }
}
`

export const  DELETEITEM = gql ` 
mutation DeleteItem( $_id:ID ) {
        deleteItem( _id:$_id) {
            _id
            naziv
            datum
            price
        }
}
`

export const  UPDATEITEM = gql ` 
mutation UpdateItem($_id:ID, $naziv:String, $datum:String, $price:String ) {
        updateItem(_id:$_id, naziv:$naziv, datum:$datum, price:$price) {
            _id
            naziv
            datum
            price
        }
}
`