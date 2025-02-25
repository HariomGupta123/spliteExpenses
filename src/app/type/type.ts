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
export interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null; // Allow 'null' here as well
}

export interface person {
    userId: string;
    userName: string | null | any
    PaidAmount: number
    paidOwn?: string
    kharchOnUser?: number | null | string
    spliteType?: string
}
export interface SimplifiedUser {
    id: string;
    name?: string;
    paid?: number
}
// 
export interface FormData {
    people: {
        paid: number;
    }[];
}
