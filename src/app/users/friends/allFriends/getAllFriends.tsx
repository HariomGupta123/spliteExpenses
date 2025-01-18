import { useQuery } from "@tanstack/react-query";
export const useGetAllFriends = () => {
    const allVerifiedFriend = async () => {
        const response = await fetch("/api/invite/verifyEmail/getVerifiedEmail");
        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }
        return response.json();
    };

    const { data: allVerifiedFriends, isLoading, isError } = useQuery({
        queryKey: ["allVeriedFriends"],
        queryFn: allVerifiedFriend,
    });


    return {allVerifiedFriends,  isLoading, isError, };
};
