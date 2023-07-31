/* eslint-disable @typescript-eslint/no-explicit-any */
interface Event {
    id: number;
    identifier: string;
    payload: Record<string, any>;
    created_at: Date;
    updated_at: Date;
}

interface App {
    id: number;
    name: string;
    channels: Channel[];
    creator: User;
}

interface User {
    id: number;
    username: string;
    password: string;
    createdApps: App[];
}

interface Channel {
    id: number;
    name: string;
    events: Event[];
}

export { Event, Channel, App, User };