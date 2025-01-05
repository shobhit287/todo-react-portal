import { service } from "../interceptor";
import { apiEndpoint } from "../config/api-endpoints";
import { errorHandler } from "./errorHandler";
import { UserInterface } from "../App";
import { changePasswordInterface } from "../components/todo/changePasswordModal";

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
    },

    getById: async function (id: string): Promise<UserInterface | null>  {
        try {
            const response : UserInterface = await service({
                url: `${apiEndpoint.user}/${id}`,
                method: "get",
            });
            return response;
        } catch (error: unknown) {
            const customError : any = error;
            errorHandler(customError);
            return null;
        }
    },

    update: async function (id: string | undefined, data: Partial<UserInterface>): Promise<UserInterface | null>  {
        try {
            const response : UserInterface = await service({
                url: `${apiEndpoint.user}/${id}`,
                method: "put",
                data
            });
            return response;
        } catch (error: unknown) {
            const customError : any = error;
            errorHandler(customError);
            return null;
        }
    },

    changePassword: async function (id: string | undefined, data: changePasswordInterface): Promise<UserInterface | null>  {
        try {
            const response : UserInterface = await service({
                url: `${apiEndpoint.user}/${id}/change-password`,
                method: "patch",
                data
            });
            return response;
        } catch (error: unknown) {
            const customError : any = error;
            errorHandler(customError);
            return null;
        }
    }
}