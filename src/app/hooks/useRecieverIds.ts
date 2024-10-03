export type User = {
    userId: string;
    toGiveAmount: number;
    toRecieveAmount: number;
    paidAmount: number;
};

export type Giver = {
    giverId: string;
    amount: number;
};

export type GroupedTransaction = {
    receiverId: string;
    givers: Giver[];
    totalAmount: number;
};

export type GroupedTransactionsMap = { [receiverId: string]: GroupedTransaction };

export const useRecieverIds = (newUser: User[]): GroupedTransactionsMap => {
    const transactions: GroupedTransactionsMap = {};
    const usersToGive = newUser.filter(user => user.toGiveAmount > 0);
    const usersToReceive = newUser.filter(user => user.toRecieveAmount > 0);

    for (let giver of usersToGive) {
        for (let receiver of usersToReceive) {
            if (giver.toGiveAmount === 0) break; // No more giving left
            if (receiver.toRecieveAmount === 0) continue; // This receiver can't receive anymore

            // Determine how much can be transferred
            const transactionAmount = Math.min(giver.toGiveAmount, receiver.toRecieveAmount);

            // Check if the receiverId is already in the transactions object
            if (!transactions[receiver.userId]) {
                transactions[receiver.userId] = {
                    receiverId: receiver.userId,
                    givers: [],
                    totalAmount: 0,
                };
            }

            // Add the current transaction for this receiver
            transactions[receiver.userId].givers.push({
                giverId: giver.userId,
                amount: transactionAmount,
            });

            // Update the total amount for this receiver
            transactions[receiver.userId].totalAmount += transactionAmount;

            // Update the remaining amounts for giver and receiver
            giver.toGiveAmount -= transactionAmount;
            receiver.toRecieveAmount -= transactionAmount;
        }
    }

    // Return an object with unique receiverId entries
    return transactions;
};

export default useRecieverIds
