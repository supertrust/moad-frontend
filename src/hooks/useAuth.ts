import { AuthContext } from "@src/contexts/AuthContext";
import { useContext } from "react"

const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw Error('useAuth only be called inside auth provider!');
    }

    return value;
}

export default useAuth;