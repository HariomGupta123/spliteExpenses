export const filterTransactions = (giveTakeAmount:any, currentUserId:any) => {
    const outgoing:any = [];
    const incoming:any = [];

    giveTakeAmount.forEach((transaction:any) => {
        if (transaction.giverId.includes(currentUserId)) {
            outgoing.push(transaction);
        } else if (transaction.receiverId === currentUserId) {
            incoming.push(transaction);
        }
    });

    return { outgoing, incoming };
};
