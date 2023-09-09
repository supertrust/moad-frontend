export const PublicRoute = ["login", "landing", "signup"]

export const isAuthenticateRoute=(pathName)=>{

    for (const substring of PublicRoute) {
        if (pathName.includes(substring)) {
            return false;
        }
    }
    return true;
}