import React, { useState } from 'react'
import Model from '../componets/Model/Model'

import Button from '../componets/Button/Button';
import SettlementOption from './SettlementOption';
interface SettleProps {
  isOpen?: boolean; // corrected the type here
  onClose: () => void;
}
const Settle: React.FC<SettleProps> = ({ isOpen, onClose }) => {
    const [isOpenPayment,setOpenPayment]=useState(false)
  const date = new Date()
  const handleOpenPayment=()=>{

    setOpenPayment(true)
  }

  return (

    <Model isOpen={isOpen} onClose={()=>{
    setOpenPayment(false)
    onClose()
   } } heading='Settle Up'>
      {isOpenPayment ? <SettlementOption /> : (
        <div className="flex flex-col justify-center items-center space-y-2 mt-12 sm:mt-8 md:mt-8 ">
          <h2>Choose a payment method</h2>
        <Button onClick={handleOpenPayment} stytle={"w-[320px] sm:w-[350px] md:w-[350px]"}>Record as a cash Payment</Button>
          <Button onClick={handleOpenPayment} stytle={"w-[320px] sm:w-[350px] md:w-[350px]"}>Esewa Payment</Button>
          <p className='text-sm font-thin text-gray-500 '>When you use a payment service, your payment is shared with that company under its Privacy Policy and Terms, including any fees if applicable. Splitwise charges no additional fees.</p>
      </div>)}
    
      <hr className="border-gray-300  mt-3" />
     
      <div className='flex justify-end gap-4 mt-2 '>
        <Button onClick={()=>{
          onClose()
          setOpenPayment(false)

        }}> Cancel</Button>
        <Button>Save</Button>
      </div>
    </Model>


  )
}

export default Settle
