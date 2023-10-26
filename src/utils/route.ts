export const WithoutAuthenticationRoute = ["signup","login"]

//todo: "admin/advertisement" will be removed after api implement
export const PublicRoute = [...WithoutAuthenticationRoute,"landing","admin/advertisement"];

export const isAuthenticateRoute=(pathName : string)=>{

    for (const substring of PublicRoute) {
        if (pathName.includes(substring)) {
            return false;
        }
    }
    return true;
}

export const isWithoutAuthenticateRoute=()=>{

    const pathName = window.location.pathname;
    for (const substring of WithoutAuthenticationRoute) {
        if (pathName.includes(substring)) {
            return true;
        }
    }
    return false;
}

export const isCargoRoute = (urlString : string)=>
{
    if(!urlString)
        return false;

    return urlString.startsWith("/cargo")
}


export const isAdminRoute = (urlString: string) => {
    if(!urlString)
        return false;
    return urlString.startsWith("/admin")
}
