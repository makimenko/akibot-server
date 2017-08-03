import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AkiBotServerEvents } from "./akibot-server-events";

export interface AkiBotServer {

    start(): Promise<void>;

    stop(): Promise<boolean>;


}
