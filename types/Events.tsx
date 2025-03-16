import { z } from "zod";

export const ACTIONS = {
    FORMAT_ELEMENT_EVENT_WEB: "formatElementEvent",
    NOTIFY_STATE_CHANGE_RN: "notifyStateChange",
} as const;

export type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

export const EventSchema = z.object({
    action: z.enum(Object.keys(ACTIONS) as [ActionType, ...ActionType[]]),
    payload: z.record(z.any()).optional(),
    callbackAction: z.string().optional()
});

export type EventPaylod = z.infer<typeof EventSchema>;
