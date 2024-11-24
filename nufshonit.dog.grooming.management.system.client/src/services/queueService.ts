// src/components/queue/QueueService.ts
import axios from "axios";
import { IFilter, IBarberQueue } from "../models/queue";

const BASE_URL = "https://localhost:7134/api/queue";

export const fetchQueue = async (token: string): Promise<IBarberQueue[]> => {
    const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


export const getByFilters = async (token: string, filter: IFilter): Promise<IBarberQueue[]> => {
    const params = new URLSearchParams();

    // Add non-null properties to the query string
    Object.keys(filter).forEach((key) => {
        const value = (filter as any)[key];
        if (value !== null && value !== undefined && value !== "") {
            params.append(key, value);
        }
    });

    const response = await axios.get(`${BASE_URL}/filters?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response);
    return response.data;
};


export const addToQueue = async (
    token: string,
    customerName: string,
    arrivalTime: string
): Promise<IBarberQueue> => {
    const response = await axios.post(
        BASE_URL,
        { customerName, arrivalTime },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const updateQueue = async (token: string, item: IBarberQueue): Promise<IBarberQueue> => {
    const response = await axios.patch(BASE_URL, item, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteFromQueue = async (token: string, id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
