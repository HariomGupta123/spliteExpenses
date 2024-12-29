export interface ExpenseDetail {
  amount: number;
  description: string;
  paidBy: string | string[]; // Allow either a single string or an array of strings
  involvePeopleOnKharch: InvolvePeopleOnKharch | undefined; // Undefined is fine; no need for `any`
  spliteType?: string; // Optional property
  getBackAmount: number; // Use `number` directly unless dynamic typing is required
  onePayer?: string; // Optional property
  onePayerId: string; // Required property
}

export interface InvolvePeopleOnKharch {
  id: string; // Use `id` as string for identification
  involved: boolean; // Boolean, not Boolean (primitive type is recommended)
  kharchOnUserInAmount: number; // No need for `any` if the type is fixed
  name: string;
  toGiveInType?: string; // Optional property
}
