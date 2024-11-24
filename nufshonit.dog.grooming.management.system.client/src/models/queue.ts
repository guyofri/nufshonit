export interface IBarberQueue {
    id?: number | null;
    customerName?: string | null;
    arrivalTime?: string | null;
    createdByUserId?: number | null;
    createdDate?: Date | null;
    fromCreatedDate?: Date | null;
    toCreatedDate?: Date | null;
}

export interface IFilter {
    customerName?: string | null;
    fromCreatedDate?: string | null; // ISO format yyyy-MM-dd
    toCreatedDate?: string | null; // ISO format yyyy-MM-dd
}