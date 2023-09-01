import axios from "axios";

interface IAxiosError {
    status: number;
    message: string;
}

/**
 * Handles errors thrown during Axios HTTP requests.
 * @param error - The error object from Axios.
 * @param defaultMessage - The default message to use if no message is provided in the error.
 * @returns An object containing the status code and the error message.
 */
export default function handleAxiosError(error: unknown, defaultMessage: string): IAxiosError {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const { data: { message }, status } = error.response;
            return {
                status,
                message: message || defaultMessage
            }
        }
        if (error.request) {
            return {
                status: 408, // HTTP status code for Request Timeout
                message: defaultMessage
            };
        }


        // Something happened while setting up the request
        return {
            status: 500, // Internal Server Error
            message: defaultMessage
        };
    }

    let message: string;
    if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message
    } else {
        message = defaultMessage;
    }

    // Unknown error type
    return {
        status: 520,
        message
    }
}
