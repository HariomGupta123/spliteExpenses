import Model from '@/app/componets/Model/Model'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import UserAvatar from './Avatar'
import Checkbox from '@/app/componets/Input/CheckBox'
import { Controller, DefaultValues, FieldErrors, FieldValues, SubmitHandler, useForm, UseFormRegister, useWatch } from 'react-hook-form'
import Input from '@/app/componets/Input/Input'
import { User } from '@/app/type/type'
// interface User {
//     id: string;
//     name: string;
//     paid: number;
// }

interface ChoosePayerProps {
    register: UseFormRegister<FieldValues>;
    equalSplitAmount: number | string // Ensure it's a number
    isChecked?: boolean
    isMultiple: boolean
    setIsMultiple: (isMultiple: any) => void
    onClose: () => void;
    openPayer: boolean;
    setIsChecked: (isChecked: any | undefined) => void
    style?: string;
    errors: FieldErrors;
    userName: any
    chooseOnePayer: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;
    currentUser: User
    chooseMultiplePayer:any
    activePayer:string
    setActivePayer:(user:any)=>void

}

const ChoosePayer: React.FC<ChoosePayerProps> = ({ activePayer,setActivePayer,onClose, openPayer, style, userName, register, errors, equalSplitAmount, chooseOnePayer,chooseMultiplePayer, currentUser, isMultiple, setIsMultiple }) => {

    const { setValue, control, watch, handleSubmit,reset } = useForm();
    const watchedPeople = useWatch({ control, name: 'people' });

    const [people, setAxactAmount] = useState(watchedPeople || []);
    // const [selectedUserId, setSelectedUserId] = useState<string | null>(currentUser.id); // State to track the selected user


    useEffect(() => {
        setAxactAmount(watchedPeople || []);
    }, [watchedPeople]);
    // console.log("choosePayerPeople", people)
    const amount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;
    const [isChecked, setIsChecked] = useState(false)
    const TotalUser:  number = userName.length
    const [multiplePayers, setMultiplePayers] = useState<[]>([])
   const [multiplePayerss,setMultiplePayerss]=useState<[]>([]);
//    useEffect(()=>{setSelectedUserId(localStorage.getItem("active") ||currentUser.id)},[])
    const handleCheckBox =useCallback( () => {
        const checked = !isChecked;
        setIsChecked(checked);
        console.log("checked", checked)

        // Create an array to store the selected users
        const updatedUsers: any = [];

        userName.forEach((user:any, index:number) => {
            if (checked === true) {
                // Update the paid value for each user
                setValue(`people.${index}.paid`, equalSplitAmount);

                // Add the user's information to the array for the parent
                updatedUsers.push({
                    userId: user.id,
                    userName: user.name,
                    PaidAmount: equalSplitAmount,
                    paidOwn: "Each person paid for their own share"
                });
            } else {
                // Set the individual paid value when unchecked
                const rrr: any = setValue(`people.${index}.paid`, 0);

            }
        });

        // Update the parent state with all selected users
        if (checked === true) {
            setMultiplePayers(updatedUsers); // Send all selected users to the parent
        } else {
            setMultiplePayers([])
        }
    },[isChecked,equalSplitAmount,setValue,userName]);
    const updatedUsers = useMemo(() => {
        if (isChecked === false) {
            return userName.map((user:any, index:number) => {
                const userPercentage = people[index]?.paid || '';
                return {
                    userId: user.id,
                    userName: user.name,
                    spliteType: 'multiple Payer',
                    paidMount: userPercentage,
                };
            })
        } else{
           setMultiplePayerss([])
        }
    }, [userName, people, isChecked,setMultiplePayerss]);
 
  
    const prevUpdatedUsersRef = useRef<any>(null);
       useEffect(()=>{
           if (JSON.stringify(prevUpdatedUsersRef.current) !== JSON.stringify(updatedUsers)) {
            //    setMultiplePayerss(updatedUsers)
               chooseMultiplePayer(activePayer =="" ?(isChecked===false ?(updatedUsers):multiplePayers):"")
               prevUpdatedUsersRef.current = updatedUsers;
           }
        
       },[updatedUsers,chooseMultiplePayer,setMultiplePayers,multiplePayers,multiplePayerss,isChecked,activePayer])
    // console.log("multiplepayers", multiplePayers);
    // console.log("multiplepayerss", multiplePayerss);


    const handleInputChange = useCallback((value: number | string, index: number) => {
        setValue(`people.${index}.paid`, value);

    }, [setValue]);

    return (
        <Model isOpen={openPayer} onClose={onClose} heading='Choose payer' style={style}>

            <div className='mt-10 w-full'>
                {userName && userName.length > 0 ? (
                    userName.map((user:any, index:any) => {
                        // console.log("alluser", user); // Log each user correctly
                         const comparisionOnActive= activePayer == "you" ? currentUser.id: activePayer
                        const isActive = comparisionOnActive=== user.id  ; // Check if the user is active
                        // console.log("activePayer",activePayer)
                        // console.log("active",isActive)
                        return (
                            <div
                                key={user.id}
                                className={`cursor-pointer w-full p-1 px-10 rounded-sm shadow-md ${isActive ? 'bg-blue-300 text-white' : 'hover:bg-slate-200'
                                    }`} // Apply active and hover styles
                                onClick={() => {
                                    if (user.name) {
                                        chooseOnePayer({
                                            userId: user.id,
                                            userName: user.name,
                                            PaidAmount: amount * TotalUser,
                                        });
                                        chooseMultiplePayer('')
                                        setActivePayer(user.id); // Set the selected user
                                        onClose();
                                        setIsMultiple(false)
                                      
                                    }
                                }}
                            >
                                <UserAvatar usersName={user.name} />
                            </div>
                        );
                    })
                ) : (
                    <div>No users available</div>
                )}

                <div className='p-4 bg-slate-100 flex-wrap w-full mt-5'>
                    <span className='font-semibold text-lg text-slate-950  w-full cursor-pointer' onClick={() => {
                        setIsMultiple(true)
                        setActivePayer('')
                         chooseOnePayer([])

                    }}>Multiple people</span>
                    <div className='  mt-2 w-full border-b-[1px] border-lime-700' />

                    {isMultiple && (

                        <div>
                            <Checkbox label='Each person paid for their own share' id='checkbox' type='checkbox' onChange={() => handleCheckBox()} register={register} errors={errors} defaultChecked={isChecked} />

                            {userName && userName.length > 0 ? (
                                userName.map((user:any, index:number) => {
                                    const currentPaid = people[index]?.paid ||"0" ; // Get the value from useWatch

                                    console.log(`Current value for ${user.name}:`, currentPaid);
                                    return (

                                        <div key={user.id} className=' flex  cursor-pointer w-full p-1 px-10 rounded-sm'>

                                            {/* <Input
                                                id={`people.${index}.paid`}
                                                label={user.name}
                                                register={register}
                                                type="number"
                                                errors={errors}
                                                disabled={isChecked}
                                                rupees="Rs"
                                                style="w-20"
                                                defaultValue={isChecked ===false? 0 :currentPaid}
                                                onChange={(event: any) => handleInputChange(event.target.value , index)}
                                            /> */}
                                            <Input
                                                id={`people.${index}.paid`}
                                                label={user.name}
                                                register={register}
                                                type="number"
                                                errors={errors}
                                                disabled={isChecked}
                                                rupees="Rs"
                                                style="w-20"

                                                value={isChecked ? equalSplitAmount : currentPaid} // Bind to `useWatch`
                                                onChange={(event: any) => handleInputChange(event.target.value, index)}
                                            />

                                            <span className="ml-4 text-slate-800">{currentPaid}</span>

                                        </div>
                                    );
                                })
                            ) : (
                                <div>No users available</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Model>
    )
}

export default ChoosePayer
