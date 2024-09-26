"use client"
import { User } from '@prisma/client'
import React from 'react'
interface UserlistProp{
    item:User[] |null|undefined
}
const Userlist = ({item}:UserlistProp) => {
  console.log(item)
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
