import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
const RotatingLogo = () => {
  return (
    <div className="bg-[url('/icons/bahar-wala.svg')] bg-cover" >
        
    <motion.div
    animate={{rotate:360}}
    transition={{
      repeat:Infinity,
      duration:6,
      ease:"linear",
      }}>
      
    <Image
      src="/icons/andar-wala.svg"
      alt="Kuber yantra"
      width={60}
      height={60} />
      </motion.div>
      </div>
  )
}

export default RotatingLogo
