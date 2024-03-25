import { gql } from '@apollo/client'

export const  CREATESTAVKA = gql ` 
mutation CreateStavka( $stavkaInput:StavkaInput ) {
        createStavka( stavkaInput:$stavkaInput) {
            _id
            godina
            broj_izvoda
            datum,
            kartica {
                naziv
            }
            deponent
            korisnik
            oznaka {
                naziv
            }
            broj_predmeta
            godina_predmeta
            duguje
            potrazuje
        }
}
`

export const  DELETESTAVKA = gql ` 
mutation DeleteStavka( $id:ID ) {
        deleteStavka( id:$id) {
            _id
            oznaka { 
                naziv
            }
            duguje
            potrazuje
        }
}
`
export const  UPDATESTAVKA = gql ` 
mutation UpdateStavka( $id:ID, $newStavka:StavkaInput ) {
        updateStavka( id:$id, newStavka:$newStavka ) {
            _id
            godina
            broj_izvoda
            datum,
            kartica {
                naziv
            }
            deponent
            korisnik
            oznaka {
                naziv
            }
            broj_predmeta
            godina_predmeta
            duguje
            potrazuje
        }
}
`
