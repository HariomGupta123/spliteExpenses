import clsx from 'clsx'
import React from 'react'
interface PaidFriendAndYou{
    paidUserName:string | any
    amount:number |any
    lentAmount?: number | any
    text?:string |any
    style?:string
    lentYou?:string
    giverUserName?:string | any
}
const PaidFriendAndYou: React.FC<PaidFriendAndYou> = ({ paidUserName,giverUserName, style, lentYou,amount,lentAmount,text}) => {
  return (
      <div className='flex gap-2 text-sm sm:text-sm sm:font-thin'>
        <div className=''>
              <div className='sm:text-sm sm:font-thin'> {paidUserName} paid</div>
              <div className='text-gray-500 sm:text-sm sm:font-thin'>{amount}</div>
        </div>
    
      <div className=''>
              <div className='sm:text-sm sm:font-thin'> {paidUserName} {text} {lentYou}{giverUserName}</div>
              <div className={clsx(style ? 'text-red-400 text-sm font-medium' : 'text-gray-500 sm:text-sm font-medium')}>{lentAmount ? lentAmount : "borrowed nothing"}</div>
      </div>
    </div>
  )
}

export default PaidFriendAndYou
