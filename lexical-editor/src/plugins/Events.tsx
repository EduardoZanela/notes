import EventEmitter from "events";
import { useEffect } from "react";
import { EventSchema, type ActionType } from "../../../types/Events";

const RNEvents = new EventEmitter();

export const registerRNHandler = (action: ActionType, handler: (payload: any) => void) => {
    RNEvents.on(action, handler);
    return () => { RNEvents.off(action, handler); };
}

export const useRHHandler = (action: ActionType, handler: (payload: any) => void) => {
    useEffect(() => {
        const deregister = registerRNHandler(action, handler);
        return () => { deregister(); };
    }, [action, handler]);
}

const onMessageFromRN = (message: string) => {
    const result = EventSchema.safeParse(message);
    if (!result.success) {
        console.error('Invalid event structure:', result.error.format());
        return;
    }
    const { action, payload } = result.data;
    RNEvents.emit(action, payload);
}

window.onMessageFromRN = onMessageFromRN;