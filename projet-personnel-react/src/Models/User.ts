import Authorization from "./Authorization";

export default interface User {
    id: string|null,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    authorization: Authorization
}