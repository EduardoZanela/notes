import EventEmitter from "events";
import { useEffect } from "react";

const RNEvents = new EventEmitter();

export const ACTIONS = {
    REDIRECT_MESSAGE_TO_WEB_RN: "redirectToWeb", 
    FORMAT_ELEMENT_EVENT_WEB: "formatElementEvent",
    NOTIFY_STATE_CHANGE_RN: "notifyStateChange",
} as const;

export type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

export type EventPayload ={
    action: ActionType
    payload?: any,
    callbackAction?: string
};

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

export const onEventMessage = (message: EventPayload) => {
    const { action, payload } = message;
    RNEvents.emit(action, payload);
}

export const postMessageToWebApp = ( payload: EventPayload) => {
    const message: EventPayload = { action: ACTIONS.REDIRECT_MESSAGE_TO_WEB_RN, payload };
    onEventMessage(message);
}
  