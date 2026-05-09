import { Application, Request, Response } from "express";
import swaggerJSDoc, {Options} from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import env from "./env.js";


export class SwaggerConfig {
    private readonly spec;

    constructor(private readonly app: Application) {
        this.spec = swaggerJSDoc(this.buildOptions())
    }

    private buildOptions(): Options{
        return {
            definition: {
                openapi: "3.0.3",
                info: {
                    title: "AI Interview Plateform",
                    version: "1.0.0",
                    description: "API documentation for Itinerary Builder backend",
                },
                servers: [{ url: "http://localhost:4000", description: "Local server"}],
            },
            apis: [
                path.join(process.cwd(), "src/routes/**/*.ts"),
                path.join(process.cwd(), "dis/routes/**/*.js"),
            ],
        };
    }

    public setup(): void {
        this.app.use(env.SWAGGER_UI_ENDPOINT, swaggerUi.serve, swaggerUi.setup(this.spec));
        this.app.get(env.SWAGGER_SPECS_ENDPOINT, (_req: Request, res: Response) => {
            res.status(200).json(this.spec);
        });
    }
}