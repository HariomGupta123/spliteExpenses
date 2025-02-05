import React from 'react'
interface ProfilField{
    label:string |null
    value:string
}
const ProfileField = ({label,value}:ProfilField) => {
  return (
      <div className="flex justify-between items-center border-b pb-2">
          <div>
              <p className="text-gray-600 text-sm">{label}</p>
              <p className="font-semibold">{value}</p>
          </div>
          <button className="text-blue-500 hover:underline text-sm">✎ Edit</button>
      </div>
  )
}

export default ProfileField
