import Image from "next/image";
import React from "react";
import nameHari from "../../../../../public/cardphoto.jpeg"
import { Expense } from "@prisma/client";
import ExpendingByCategory from "./ExpendingByCategary";
interface ExpenseDetailProps {
    expenseDetial: Expense[]
}
const ExpenseDetail: React.FC<ExpenseDetailProps> = ({ expenseDetial }) => {
    console.log("expensesDetial", expenseDetial)
    const amounts = expenseDetial.flatMap((item: any) => item.paidByIds);
    const isMatched = amounts[0];
    console.log("amount", isMatched); // Output: [4000]
    return (
        <>
            {expenseDetial.map((detial: any) => (
                <div key={detial.id} className="max-w-7xl mx-auto px-8 py-8 bg-white shadow-xl rounded-lg   ">
                    {/* Header Section */}

                    <div className="flex  items-center mb-6 gap-3">
                        <div className="w-[70px] h-[70px] border-slate-500 bg-slate-300"></div>
                        <div>

                            <div className="py-2">

                                <div className="font-extralight text-gray-800 text-sm">{detial?.description}</div>
                                <div className="text-xs font-extralight text-gray-800">{detial?.amount}</div>
                                <div className="text-sm text-gray-500">Paid by Hari O. and owes $100.00</div>

                                <button className="bg-orange-500 text-white px-3 py-0.5 rounded-md font-extralight">Edit expense</button>
                            </div>
                        </div>

                    </div>
                    <div className="border-t border-gray-900 my-4"></div>
                    <div className="flex gap-7 w-full  ">
                        <div className="space-y-1 mb-2">
                            {(detial.giveTakeAmount || []).map((giveTake: any) => {
                                return (
                                    <div key={giveTake.id} className="flex items-center space-x-1">
                                        {giveTake.giverId === isMatched ? (<><Image
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={nameHari}
                                            alt="Hari O."
                                            width={45}
                                            height={45} />
                                            <div className="text-gray-800">{giveTake.receiverUser.name} paid {detial?.amount} and owes {giveTake.toGiveAmount}</div></>)
                                            : (<><Image
                                                className="w-10 h-10 rounded-full object-cover"
                                                src={nameHari}
                                                alt="Hari O."
                                                width={45}
                                                height={45} />
                                                <div className="text-gray-800">{giveTake.giverUser.name}  and owes {giveTake.toGiveAmount}</div></>)}

                                    </div>
                                )
                            })}


                        </div>
                        <ExpendingByCategory />

                    </div>

                </div>
            ))}

        </>
    );
};

export default ExpenseDetail;
