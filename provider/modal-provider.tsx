"use client";

import { useState, useEffect } from "react";

import StoreModal from "@/components/modals/store-modal";

export const ModalProvider = () => {
    const [isMounded, setIsMounded] = useState(false);

    useEffect(() => {
        setIsMounded(true);
    }, []);

    if (!isMounded) {
        return null;
    }

    return(
        <>
            <StoreModal />
        </>
    )
}