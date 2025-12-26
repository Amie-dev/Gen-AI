import dotenv from "dotenv"
// dotenv.config()

let loaded=false

export function loadEnv():void{
    if (!loaded) {
        dotenv.config();
        loaded=true
    }
}
