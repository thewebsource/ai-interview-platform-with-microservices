import express, { type Application } from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import env from "./config/env.js";
import { SwaggerConfig } from "./config/swagger.js";


export class App {
    private static instance: App;
    private app: Application;
    private port: number;

    constructor(port: number){
        this.app = express();
        this.port = port;
        this.initializeMiddleware();
        this.initializeCors();
        this.initializeSwagger();
    }

    private initializeMiddleware(): void {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ limit: "50mb" }));
        this.app.use(cookieParser());
    }

    private initializeCors(): void {
        const origins = env.CORS_ORIGINS;
        const corsOptions: CorsOptions = {
            origin: function (origin, callback) {
                if(!origin) return callback(null, true);
                if(origins.includes(origin)){
                    callback(null, true);
                }else{
                    callback(new Error("Not allowed by cors"));
                }
            },
            credentials: true,
            methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
            allowedHeaders: [
                'Content-Type',
                "Authorization",
                "X-Requestd-With",
                "Accept"
            ],
        };
        this.app.use(cors(corsOptions));
        this.app.options(/.*/, cors(corsOptions));
    }


    private initializeSwagger(): void {
        new SwaggerConfig(this.app).setup();
    }
}