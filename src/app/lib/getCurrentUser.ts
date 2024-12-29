import getCurrentUser from "../actions/getCurrentUser";

export const getLoginUser = async () => {
  try {
    const currentUser = await getCurrentUser()
    return currentUser?.id; // Optional chaining ensures no error if `currentUser` is null/undefined
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // Return null if an error occurs
  }
};
