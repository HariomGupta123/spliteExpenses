type userArray = {
  userId: string;
  userName: string;
  PaidAmount: string;
  paidOwn: string;
};

type Transaction = {
//   giverUser: {
//     id: string;
//     name: string;
//   };
//   receiverUser: {
//     id: string;
//     name: string;
//   };
  giverId: string;
  receiverId: string;
  toGiveAmount: number;
};

const multiplePayersArray = (userArray: userArray[], amount: number): Transaction[] => {
  const targetAmount = amount;
  const balances = userArray.map((user) => ({
    ...user,
    balance: parseFloat(user.PaidAmount) - targetAmount
  }));

  const transactions: Transaction[] = [];
  let givers = balances.filter((user) => user.balance < 0); // Those who paid less
  let receivers = balances.filter((user) => user.balance > 0); // Those who paid more

  // Process transactions
  givers.forEach((giver) => {
    receivers.forEach((receiver) => {
      if (giver.balance < 0 && receiver.balance > 0) {
        const amountToTransfer = Math.min(Math.abs(giver.balance), receiver.balance);

        transactions.push({
        //   giverUser: { id: giver.userId, name: giver.userName },
        //   receiverUser: { id: receiver.userId, name: receiver.userName },
          giverId: giver.userId,
          receiverId: receiver.userId,
          toGiveAmount: amountToTransfer
        });

        // Adjust balances after the transaction
        giver.balance += amountToTransfer; // Giver's balance becomes less negative
        receiver.balance -= amountToTransfer; // Receiver's balance becomes more positive
      }
    });
  });

  return transactions;
};

export default multiplePayersArray;
