
export interface UserModel {
    name: string;
    created_at: string;
    email: string;
    createdAt: string;
    amountSpent: string;
    id: string;
    status: string[]; // Status is an array of strings (tags)
    Role: string;
    tags: string[];
  }