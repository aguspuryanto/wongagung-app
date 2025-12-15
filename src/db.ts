// src/db.ts
import { init } from "@instantdb/react";

// Visit https://instantdb.com/dash to get your APP_ID :)
const APP_ID = import.meta.env.VITE_INSTANT_APP_ID; 

export const db = init({ appId: APP_ID });
