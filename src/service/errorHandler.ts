import { notification } from "antd";
import { interceptorHandledError } from "../interceptor/interceptorHandledErrors";

interface ErrorInterface {
    response: {
        status?: number,
        data?: {
            message?: {
                error: string
            },
            errors?: string[]
        };
    }
    code: string
}
export const errorHandler = (error: ErrorInterface) => {
    const { status } = error?.response || {};
    const { code } = error || {};
    if (!interceptorHandledError.includes(status || code)) {
        const errors = error?.response?.data?.message || error?.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
            errors.forEach((err: string) => {
                notification.error({ message: err });
            });
        } else if (typeof errors === "object") {
            notification.error({ message: errors.error });

        } else if(typeof errors === "string"){
            notification.error({ message: errors });
        } else {
            notification.error({ message: "An Unexpected error occured" });
        }
    }
}