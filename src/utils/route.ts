export const WithoutAuthenticationRoute = ["signup","login"]

export const PublicRoute = [...WithoutAuthenticationRoute,"landing"];

export const isAuthenticateRoute=(pathName)=>{

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

export const isCargoRoute = (urlString)=>
{
    if(!urlString)
        return false;

    return urlString.startsWith("/cargo")
}
