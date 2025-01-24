import getCurrentUser from "@/app/actions/getCurrentUser";
import AllExpen from "./allExpen";
import { getUsers } from "@/app/actions/getUsers";

const AllExpenses = async () => {
    const currentUser = await getCurrentUser();
    const otherUsers=await getUsers()
    const current = {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email
    }
    if (!currentUser) {
        return (
            <div>
                <h1>Please log in to access this page.</h1>
            </div>
        );
    }

    return (
        <>
            <AllExpen currentUser={current} users={otherUsers}/>
        </>
    );
};

export default AllExpenses;
