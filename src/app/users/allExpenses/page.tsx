import getCurrentUser from "@/app/actions/getCurrentUser";
import AllExpen from "./allExpen";
import { getUsers } from "@/app/actions/getUsers";

const AllExpenses = async () => {
    const currentUser = await getCurrentUser();
    const otherUsers=await getUsers()

    if (!currentUser) {
        return (
            <div>
                <h1>Please log in to access this page.</h1>
            </div>
        );
    }

    return (
        <>
            <AllExpen currentUser={currentUser} users={otherUsers}/>
        </>
    );
};

export default AllExpenses;
