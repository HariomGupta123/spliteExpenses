export const filterTransactions = (giveTakeAmount: any, currentUserId: any) => {
    if (!Array.isArray(giveTakeAmount)) {
        console.error("Error: giveTakeAmount is not an array", giveTakeAmount);
        return { outgoing: [], incoming: [] };
    }

    const outgoing: any = [];
    const incoming: any = [];

    giveTakeAmount.forEach((transaction: any) => {
        if (transaction.giverId?.includes(currentUserId)) {
            outgoing.push(transaction);
        } else if (transaction.receiverId === currentUserId) {
            incoming.push(transaction);
        }
    });

    return { outgoing, incoming };
};
