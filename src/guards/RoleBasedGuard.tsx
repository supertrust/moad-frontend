import useAuth from "@src/hooks/useAuth";
import {useRouter} from "next/router";

type RoleBasedGuardProp = {
    roles?: string[];
    children: React.ReactNode;
};
export default function RoleBasedGuard({ roles, children }: RoleBasedGuardProp) {
    // Logic here to get current user role
    const { user } = useAuth();
    const { replace } = useRouter();

    if (typeof roles !== 'undefined' && !roles.includes(user?.role || '')) {
        return <></>
    }
    return <> {children} </>;
}
