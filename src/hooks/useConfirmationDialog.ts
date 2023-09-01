import { ConfirmDialogContext } from "@src/contexts/ConfirmDialogContext";
import { useContext } from "react";

export function useConfirmDialog() {
    const value = useContext(ConfirmDialogContext);
    if (!value) {
        throw Error("useConfirmDialog only be called inside confirm dialog provider");
    }
    return value;
}
