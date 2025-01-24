import React from 'react'
interface SelectedPayerProps{
    selectedPayer: string | number //selectedOwns
    equalSplitAmount: number | string

    isMultiple:boolean
    pickOnePayer:any
    isEqual:boolean
    setIsOpenPayer:()=>void
   setIsSpliteOption:()=>void
}
const SelectedPayer: React.FC<SelectedPayerProps> = ({ selectedPayer, equalSplitAmount, isMultiple, pickOnePayer, isEqual, setIsOpenPayer,setIsSpliteOption }) => {
    return (
        <div>
            <div className="mt-5 text-center flex row-2 gap-2 ">
                { selectedPayer? (selectedPayer === "Splite the Expenses" ? (<><span className='text-sm'>
                    Paid by <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={setIsOpenPayer}>{isMultiple ? "multiple" : pickOnePayer}</span> and splite <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={setIsSpliteOption}>{isEqual ? "unEqually" : "Equally"}</span>
                </span>
                    <span className='text-sm'>  (({equalSplitAmount})/per)</span> </>) : (<span>{selectedPayer}</span>)) : <><span className='text-sm'>
                        Paid by <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={ setIsOpenPayer}>{isMultiple ? "multiple" : pickOnePayer}</span> and splite <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={setIsSpliteOption}>{isEqual ? "unEqually" : "Equally"}</span>
                    </span>
                    <span className='text-sm'>  (({equalSplitAmount})/per)</span> </>}
            </div>
        </div>
    )
}

export default SelectedPayer
