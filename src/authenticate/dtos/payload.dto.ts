export interface PayloadDto{
    id:string;
    email: string;
    phone:string;
    displayName:string;
    roles:string[];
    application: string[];
    other: object;
}