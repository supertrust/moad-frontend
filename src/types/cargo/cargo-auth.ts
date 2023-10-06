import { LoginPropsType, RegisterPropsType } from "@src/types/auth";
import { IUser, IUserRole } from "@src/types/user";

export type ILoginRsq = {
    phone?: string;
    password: string;
    email?:string;
}

export type ILoginRes = {
    token: string
}

// export type AuthContextCargoType = {
//     isAuthenticated: boolean;
//     login: (props: LoginPropsType) => Promise<void>;
//     // register: (props: RegisterPropsType) => Promise<boolean>;
//     logout: () => Promise<void>;
//     token: string | null;
//     // user: IUser | null;
//     // userRole: IUserRole | null;
//     loading: boolean,
//     // isUserLoading : boolean,
//     // isRoleLoading : boolean
// }