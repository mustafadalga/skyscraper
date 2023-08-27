import { isAxiosError } from 'axios';

interface IAxiosError {
    message: string,
    status: number
}

export function catchError(error: any, defaultMessage: string): IAxiosError {
    if (isAxiosError(error)) {
        if (error.response) {
            const { data: { message }, status } = error.response;
            return {
                status,
                message: defaultMessage || message
            }
        }

        if (error.request) {
            return {
                status: -1,
                message: defaultMessage
            }
        }

        return {
            status: -2,
            message: defaultMessage
        }
    }

    return {
        status: -3,
        message: error.message || defaultMessage
    }
}

