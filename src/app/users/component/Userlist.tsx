"use client"
import { User } from '@prisma/client'
import { Session } from 'next-auth'
import React from 'react'
interface UserlistProp{
    item:User[] |null|undefined
  email:string  |null
}
const Userlist =({item,email}:UserlistProp) => {
  
  console.log(item)
  console.log(email)
  return (
    <div>
      {(item || []).map((item) => (
        <ul key={item.id}>
          <li>{item.name}</li>
        </ul>
      ))}
    </div>
  );

}

export default Userlist
