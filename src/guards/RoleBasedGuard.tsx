import useAuth from "@src/hooks/useAuth";
import { useRouter } from "next/router";

type RoleBasedGuardProp = {
    roles?: ("Admin" | "Advertiser" | "Cargo")[];
    children: React.ReactNode;
};
export default function RoleBasedGuard({ roles, children }: RoleBasedGuardProp) {
    // Logic here to get current user role
    const { user } = useAuth();
    const { replace } = useRouter();

    if (typeof roles !== undefined && user?.role && !roles?.includes(user?.role)) {
        return <></>
    }
    return <> {children} </>;
}
