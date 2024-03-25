import { Box, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Box sx={{ my:3}}>
     <Typography variant="h4" sx={{ fontWeight:100, fontStyle:"italic", color:"info.dark"}} >Napomena:</Typography>
     <Typography sx={{ fontWeight:100, fontStyle:"italic", color:"secondary.light", fontSize:"1.2rem"}}>Pretragu možete vršiti samo za uplate i isplate počev od 01.01.2023. godine</Typography>
      {/* <iframe src="https://www.google.com/maps/embed?pb=!4v1691497976598!6m8!1m7!1s17PdZxbUoRuMu0A31WnirA!2m2!1d42.96578446533695!2d22.12093540718504!3f343.35204275368386!4f-15.592940164777403!5f1.289667740112775" width="600" height="450" style={{ border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
     <Box sx={{ border:"1px solid #01579b",p:2, width:"65%",borderRadius:2,mt:5 }}>
     <Typography  sx={{ fontWeight:100, fontStyle:"italic", color:"info.dark"}} > Moguće je da se stranka prilikom uplate nije pozvala na broj predmeta ili da ga u banci nisu ili pak pogrešno uneli  </Typography>
     <Typography  sx={{ fontWeight:100, fontStyle:"italic", color:"info.dark"}}> U tom slučaju pretragu vršite po poznatom kriterijumu: iznosu, datumu ...</Typography>
     </Box>
    
    </Box>
  )
}

export default Home