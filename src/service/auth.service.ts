import { service } from "../interceptor";
import { apiEndpoint } from "../config/api-endpoints";
import { errorHandler } from "./errorHandler";

interface LoginInterface {
    email: string,
    password: string,
}

export const AuthService = {
    login: async function (data: LoginInterface) {
        try {
            const response = await service({
                url: apiEndpoint.login,
                method: "post",
                data
            })
            return response;
        } catch (error: unknown) {
            const customError : any = error;
            errorHandler(customError);
        }
    }
}