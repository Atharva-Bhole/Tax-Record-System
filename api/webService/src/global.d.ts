import "express-serve-static-core"

export interface User {
    id : string!;
    name : string!;
    email : string!;
    aadhar_id : string!;
    role: "admin" | "user";
    password : string!;
}


declare module 'express'{
    export interface Request{
        user ?: User
    }
}