import React, { useEffect, useState } from "react";
import { IBarberQueue } from "../../models/queue";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface QueueTableProps {
    queue: IBarberQueue[];
    openPopup: (item: IBarberQueue) => void;
    deleteFromQueue: (id: number) => void;
    userId: string;
}

const QueueTable: React.FC<QueueTableProps> = ({ queue, openPopup, deleteFromQueue, userId }) => {
    const [queue1, setQueue1] = useState<IBarberQueue[]>(queue || []);
   const filteredList = useSelector((state: RootState) => state.queue.filteredList);
    console.log('from queueTable.tsx = ', filteredList)

    useEffect(() =>
    {
        
        setQueue1(filteredList);

    }, [filteredList]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Arrival Time</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {queue1.map((item) => {
                    const isDisabled = item.createdByUserId !== parseInt(userId, 10);
                    return (
                        <tr
                            key={item.id}
                            onClick={() => !isDisabled && openPopup(item)}
                            style={{
                                cursor: isDisabled ? "not-allowed" : "pointer",
                                backgroundColor: isDisabled ? "#f9f9f9" : "transparent",
                                opacity: isDisabled ? 0.6 : 1,
                            }}
                        >
                            <td>{item.customerName}</td>
                            <td>{new Date(item.arrivalTime).toLocaleString()}</td>
                            <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the row click
                                        deleteFromQueue(item.id);
                                    }}
                                    disabled={isDisabled}>
                                    מחק
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default QueueTable;


