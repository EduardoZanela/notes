import EventEmitter from "events";
import { useEffect } from "react";

const RNEvents = new EventEmitter();

export const registerRNHandler = (action: string, handler: (payload: any) => void) => {
    RNEvents.on(action, handler);
    return () => RNEvents.off(action, handler);
}

export const useRHHandler = (action: string, handler: (payload: any) => void) => {
    useEffect(() => {
        const deregister = registerRNHandler(action, handler);
        return () => { deregister() };
    }, [action, handler]);
}

const onMessageFromRN = (message: string) => {
    const { action, payload } = JSON.parse(message);
    RNEvents.emit(action, payload);
}

window.onMessageFromRN = onMessageFromRN;