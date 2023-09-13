// api return types
export interface IRequest {
   success: boolean;
   message: string;
}

// auth types
export interface ISignup {
   name: string;
   email: string;
   password: string;
}

export type ILogin = Pick<ISignup, "email" | "password">;

export type IUser = Pick<ISignup, "name" | "email"> & {
   createdAt: string;
};
