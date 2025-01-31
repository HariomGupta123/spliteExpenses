import { useQuery } from "@tanstack/react-query";
export const useExpenseData = () => {
    const fetchExpenses = async () => {
        const response = await fetch("/api/getExpenses/getRecieve");
        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }
        return response.json();
    };

    const { data: expenses, isLoading, isError } = useQuery({
        queryKey: ["expenses"],
        queryFn: fetchExpenses,
    });

    // Extract `giveTakeAmount` and `involvePeopleOncharch` for export
   const involvePeopleOncharch=expenses?.map((user:any)=>user.involvePeopleOncharch)
    // const extractedIds = Array.isArray(involvePeopleOncharch)
    //     ? involvePeopleOncharch
    //         .filter(Array.isArray)  // Ensure each item is an array
    //         .flat()                 // Flatten the nested arrays into a single array
    //         .map((person) =>{ return {id:person.id,name:person.name}})  // Extract the 'id' property
    //     : [];  // If not an array, return an empty array

    // console.log("Extracted IDs:", extractedIds);
//    console.log("invol",involvePeopleOncharch)
//    console.log("sdjkgsd",expenses)
    return { expenses,involvePeopleOncharch,  isLoading, isError, };
};
