import { IcarusContext } from "@src/layout/cargo";
import { useContext } from "react";

export function useIcarusContext() {
    const context = useContext(IcarusContext);
    if (!context) {
        throw new Error('useIcarusContext must be use within a IcarusContextProvider');
    }
    return context;
}
