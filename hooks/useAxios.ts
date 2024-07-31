import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useLoading } from "./useLoading";

interface AxiosHookResponse<T> {
    data: T | null;
    error: AxiosError | string | null;
    isLoading: boolean;
    get: (url: string) => Promise<void>;
    post: (url: string, postData: unknown) => Promise<void>;
    put: (url: string, putData: unknown) => Promise<void>;
    patch: (url: string, patchData: unknown) => Promise<void>;
    delete: (url: string) => Promise<void>;
}

export const useAxios = <T>(customAxios?: AxiosInstance) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError | string | null>(null);
    const { stop, isLoading } = useLoading(true);

    const axiosInstance = customAxios || axios.create();

    const sendRequest = async (config: AxiosRequestConfig) => {
        try {
            const response = await axiosInstance<T>(config);
            setData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error);
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            stop();
        }
    };

    const get = async (url: string) => {
        await sendRequest({ method: "get", url });
    };

    const post = async (url: string, body: unknown) => {
        await sendRequest({ method: "post", url, data: body });
    };

    const put = async (url: string, body: unknown) => {
        await sendRequest({ method: "put", url, data: body });
    };

    const patch = async (url: string, body: unknown) => {
        await sendRequest({ method: "patch", url, data: body });
    };

    const del = async (url: string) => {
        await sendRequest({ method: "delete", url });
    };

    return { data, error, isLoading, get, post, put, patch, delete: del } as AxiosHookResponse<T>;
};
