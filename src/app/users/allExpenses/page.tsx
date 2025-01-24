import getCurrentUser from "@/app/actions/getCurrentUser";
import AllExpen from "./allExpen";

const AllExpenses = async () => {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
        throw new Error('Current user is not available.');
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
