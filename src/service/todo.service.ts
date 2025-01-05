import { CreateTodo } from "../components/todo/createTodoModal";
import { service } from "../interceptor";
import { apiEndpoint } from "../config/api-endpoints";
import { errorHandler } from "./errorHandler";

export interface TodoResponse {
    _id: string,
    title: string,
    description: string,
    status: string,
    createdAt: Date | string
}

export interface UpdateTodo {
    title: string | undefined,
    description: string | undefined
}

export const todoService = {
    create: async function (data: CreateTodo) : Promise<TodoResponse | null> {
        try {
            const response : TodoResponse = await service({
                url: apiEndpoint.todo,
                method: "post",
                data
            });
            return response;
        } catch (error: unknown) {
            const customError: any = error;
            errorHandler(customError);
            return null;
        }
    },

    search: async function (query: string) : Promise<TodoResponse[] | null> {
        try {
            const response : TodoResponse[] = await service({
                url: `${apiEndpoint.searchTodo}${query}`,
                method: "get",
            });
            return response;
        } catch (error: unknown) {
            const customError: any = error;
            errorHandler(customError);
            return null;
        }
    },

    update: async function (todoId: string | undefined, data: UpdateTodo) : Promise<TodoResponse | null> {
        try {
            const response : TodoResponse = await service({
                url: `${apiEndpoint.todo}/${todoId}`,
                method: "put",
                data
            });
            return response;
        } catch (error: unknown) {
            const customError: any = error;
            errorHandler(customError);
            return null;
        }
    },

    statusCompleted: async function (todoId: string) : Promise<TodoResponse | null> {
        try {
            const response : TodoResponse = await service({
                url: `${apiEndpoint.todo}/status/${todoId}/completed`,
                method: "patch",
            });
            return response;
        } catch (error: unknown) {
            const customError: any = error;
            errorHandler(customError);
            return null;
        }
    },

    delete: async function (todoId: string) : Promise<object | null> {
        try {
            const response : object = await service({
                url: `${apiEndpoint.todo}/${todoId}`,
                method: "delete",
            });
            return response;
        } catch (error: unknown) {
            const customError: any = error;
            errorHandler(customError);
            return null;
        }
    }
}