import { service } from "../interceptor";
import { apiEndpoint } from "../config/api-endpoints";
import { errorHandler } from "./errorHandler";

interface createInterFace {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export const UserService = {
    create: async function (data: createInterFace) {
        try {
            const response = await service({
                url: apiEndpoint.user,
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