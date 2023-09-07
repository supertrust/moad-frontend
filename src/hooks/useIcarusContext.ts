import { IcarusContext } from "@src/layout";
import { useContext } from "react";

export function useIcarusContext() {
    const context = useContext(IcarusContext);
    if (!context) {
        throw new Error('useCounter must be used within a CounterProvider');
    }
    return context;
}
