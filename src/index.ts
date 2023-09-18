/* eslint-disable @typescript-eslint/no-explicit-any */
import EventSource from 'eventsource';
import syncfetch from 'sync-fetch';
import { App, Channel, Event } from './interfaces';



/**
 * Represents a client for the EasyPush API.
 */
class EasyPushClient {
    apiKey?: string;
    /**
     * Creates a new instance of the EasyPushClient class.
     * @param endpoint The endpoint URL for the EasyPush API.
     * @param username The username to use for authentication.
     * @param password The password to use for authentication.
     * @param defaultHeaders The default headers to include in requests.
     */
    constructor(
        private readonly endpoint: string,
        private readonly username: string,
        private readonly password: string,
        private readonly defaultHeaders: any = {
            'Content-Type': 'application/json',
        }
    ) {
        // Authenticate the user and get the API key.
        this.authenticate();
    }

    /**
     * Authenticates the user and sets the API key.
     */
    private authenticate() {
        const res = syncfetch(`${this.endpoint}/auth/signin`, {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify({ username: this.username, password: this.password }),
        });
        if (res.status !== 201) {
            throw new Error(res.clone().text());
        }
        const token = res.clone().text();
        this.apiKey = token;
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Creates a new app.
     * @param name The name of the app.
     * @returns The created app object.
     */
    async createApp(name: string) {
        const res = await fetch(`${this.endpoint}/apps`, {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify({ name }),
        });
        if (res.status !== 201) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json() as App;
    }

    /**
     * Retrieves an app by ID.
     * @param appId The ID of the app to retrieve.
     * @returns The retrieved app object.
     */
    async getApp(appId: number) {
        const res = await fetch(`${this.endpoint}/apps/${appId}`, {
            method: 'GET',
            headers: this.defaultHeaders,
        });
        if (res.status !== 200) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json() as App;
    }

    /**
     * Updates an app by ID.
     * @param appId The ID of the app to update.
     * @param name The new name of the app.
     * @returns The updated app object.
     */
    async updateApp(appId: number, name: string) {
        const res = await fetch(`${this.endpoint}/app/${appId}`, {
            method: 'PATCH',
            headers: this.defaultHeaders,
            body: JSON.stringify({ name }),
        });
        if (res.status !== 200) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json() as App;
    }

    /**
     * Deletes an app by ID.
     * @param appId The ID of the app to delete.
     * @returns The deleted app object.
     */
    async deleteApp(appId: number) {
        const res = await fetch(`${this.endpoint}/app/${appId}`, {
            method: 'DELETE',
            headers: this.defaultHeaders,
        });
        if (res.status !== 201) {
            throw new Error(await res.clone().text());
        }
        return res.clone().json();
    }

    /**
     * Creates a new channel.
     * @param appId The ID of the app to create the channel for.
     * @param name The name of the channel.
     * @returns The created channel object.
     */
    async createChannel(appId: number, name: string) {
        const res = await fetch(`${this.endpoint}/channel`, {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify({ name, appId }),
        });
        if (res.status !== 201) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json() as Channel;
    }

    /**
     * Retrieves a channel by ID.
     * @param channelId The ID of the channel to retrieve.
     * @returns The retrieved channel object.
     */
    async getChannel(channelId: number) {
        const res = await fetch(`${this.endpoint}/channel/${channelId}`, {
            method: 'GET',
            headers: this.defaultHeaders,
        });
        if (res.status !== 201) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json() as Channel;
    }

    /**
     * Updates a channel by ID.
     * @param channelId The ID of the channel to update.
     * @param name The new name of the channel.
     * @returns The updated channel object.
     */
    async updateChannel(channelId: number, name: string) {
        const res = await fetch(`${this.endpoint}/channel/${channelId}`, {
            method: 'PUT',
            headers: this.defaultHeaders,
            body: JSON.stringify({ name }),
        });
        if (res.status !== 201) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json() as Channel;
    }

    /**
     * Deletes a channel by ID.
     * @param channelId The ID of the channel to delete.
     * @returns The deleted channel object.
     */
    async deleteChannel(channelId: number): Promise<any> {
        const res = await fetch(`${this.endpoint}/channel/${channelId}`, {
            method: 'DELETE',
            headers: this.defaultHeaders,
        });
        if (res.status !== 201) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json();
    }

    /**
     * Posts an event to a channel.
     * @param channelId The ID of the channel to post the event to.
     * @param eventType The type of the event.
     * @param payload The payload of the event.
     * @returns The posted event object.
     */
    async postEvent(channel_id: number, identifier: string, payload: string | any): Promise<any> {
        const res = await fetch(`${this.endpoint}/channel/${channel_id}/event`, {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify({ identifier, payload, channel_id }),
        });
        if (res.status !== 201) {
            throw new Error(await res.clone().text());
        }
        return await res.clone().json() as Event | Channel;
    }

    /**
     * Subscribes to a channel and listens for incoming events.
     * @param channel_id The ID of the channel to subscribe to.
     * @param callback The function to call when an event is received.
     */
    async subscribeToChannel(channel_id: number, callback: (evt: MessageEvent<Event>) => any) {
        const event = new EventSource(`${this.endpoint}/channel/${channel_id}/subscribe`, {
            withCredentials: true,
            headers: this.defaultHeaders,
        });

        event.onmessage = callback;
    }
}

export default EasyPushClient;
