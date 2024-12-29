import getCurrentUser from "@/app/actions/getCurrentUser";
import AllExpen from "./allExpen";

const AllExpenses = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <div>
                <h1>Please log in to access this page.</h1>
            </div>
        );
    }

    return (
        <>
            <AllExpen currentUser={currentUser}/>
        </>
    );
};

export default AllExpenses;
