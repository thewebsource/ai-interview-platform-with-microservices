import dotenv from "dotenv"
import { NODEENV } from "@repo/constants"
import { z } from "zod";

dotenv.config({override: true});

const CURRENT_NODEENV = (process.env.NODE_ENV as NODEENV)?.toLowerCase().trim() || NODEENV.DEV;

if(NODEENV.DEV.toLocaleLowerCase().trim() == CURRENT_NODEENV){
    dotenv.config({ path: ".env.development" });
}

const envSchema = z.object({
    NODE_ENV: z.enum([NODEENV.DEV, NODEENV.PROD, NODEENV.UAT]),
    CORS_ORIGINS: z.string().min(1),
    SWAGGER_SPECS_ENDPOINT: z.string().min(1),
    SWAGGER_UI_ENDPOINT: z.string().min(1)
});

const env = envSchema.parse(process.env);

export default env;