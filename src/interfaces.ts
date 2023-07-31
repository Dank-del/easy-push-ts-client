/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Represents an event that can be sent through a channel.
 */
interface Event {
    id: number;
    identifier: string;
    payload: Record<string, any>;
    created_at: Date;
    updated_at: Date;
}

/**
 * Represents an app that can send and receive events through channels.
 */
interface App {
    id: number;
    name: string;
    channels: Channel[];
    creator: User;
}

/**
 * Represents a user that can create and manage apps.
 */
interface User {
    id: number;
    username: string;
    password: string;
    createdApps: App[];
}

/**
 * Represents a channel that can be used to send and receive events.
 */
interface Channel {
    id: number;
    name: string;
    events: Event[];
}


export { Event, Channel, App, User };