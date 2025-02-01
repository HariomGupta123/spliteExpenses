import getCurrentUser from "@/app/actions/getCurrentUser";
import AllExpen from "./allExpen";
import { redirect } from "next/navigation";

const AllExpenses = async () => {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
        redirect("/")
    }

    const current = {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
    };


    return (
        <>
            <AllExpen currentUser={current} />
        </>
    );
};

export default AllExpenses;
