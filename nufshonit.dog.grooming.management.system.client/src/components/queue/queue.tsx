// src/components/queue/Queue.tsx

import React, { useState, useEffect } from "react";
import { addToQueue, deleteFromQueue, fetchQueue, updateQueue } from "../../services/queueService";
import { IBarberQueue, IFilter } from "../../models/queue";
import QueueFilter from "./queueFilter";
import QueuePopup from "./queuePopup";
import QueueTable from "./queueTable";
import { setFilteredList } from "../../store/queueSlice";
import { useDispatch } from "react-redux";

interface QueueProps {
    token: string;
    userId: string;
}

const Queue: React.FC<QueueProps> = ({ token, userId }) => {
    let [queue, setQueue] = useState<IBarberQueue[]>([]);
    const [filter, setFilter] = useState<IFilter>({  });
    const [selectedItem, setSelectedItem] = useState<IBarberQueue | null>(null);
    const [customerName, setCustomerName] = useState<string>("");
    const [arrivalTime, setArrivalTime] = useState<string>("");
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();

    // Load the queue data
    useEffect(() => {
        const loadQueue = async () => {
            try {
                queue = await fetchQueue(token);
                dispatch(setFilteredList(queue)); 
                setQueue(queue);
            } catch (err) {
                setError("Failed to fetch the queue data.");
            }
        };
        loadQueue();
    }, [token]);

    // Add a new customer to the queue
    const handleAddToQueue = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const r = await addToQueue(token, customerName, arrivalTime);
            const newItem = r as IBarberQueue;

            // Create a new array with the new item added
            const updatedQueue = [...queue, newItem];

            // Update the state with the new queue array
            setQueue(updatedQueue);

            // Dispatch the updated queue to Redux
            dispatch(setFilteredList(updatedQueue));

            // Clear form fields
            setCustomerName("");
            setArrivalTime("");
        } catch (err) {
            console.log(err);
            setError("Failed to add a new customer to the queue.");
        }
    };


    // Delete a customer from the queue
    const handleDeleteFromQueue = async (id: number) => {
        try {
            await deleteFromQueue(token, id);
            queue = queue.filter((item) => item.id !== id);
            setQueue(queue);
            dispatch(setFilteredList(queue)); 
        } catch (err) {
            console.log(err);
            setError("Failed to delete the customer.");
        }
    };

    // Save changes to the selected item
    const handleSaveChanges = async () => {
        if (selectedItem) {
            try {
                // Perform the update API call
                const updatedItem = await updateQueue(token, selectedItem);

                // Update the queue state immutably
                setQueue((prev) => {
                    const updatedQueue = prev.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    );

                    // Dispatch the updated queue to Redux
                    dispatch(setFilteredList(updatedQueue));

                    return updatedQueue;
                });

                // Reset the selected item
                setSelectedItem(null);
            } catch (err) {
                setError("Failed to save changes to the customer.");
            }
        }
    };

    
    
    //const filteredQueue = queue.filter((item) => {
    //    const matchesCustomerName = item.customerName
    //        .toLowerCase()
    //        .includes(filter.customerName.toLowerCase());
    //    const matchesCreatedDate =
    //        !filter.toCreatedDate ||
    //        new Date(item.createdDate).toISOString().slice(0, 10) < filter.toCreatedDate;

    //    return matchesCustomerName && matchesCreatedDate;
    //});

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Filter Section */}
            <QueueFilter filter={filter} setFilter={setFilter} />

            {/* Add Customer Form */}
            <h2>הוספת לקוח </h2>
            <form onSubmit={handleAddToQueue} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    required
                />
                <button type="submit">הוסף</button>
            </form>

            {/* Queue Table */}
            <h2>רשימת לקוחות </h2>
            <QueueTable
                queue={queue}
                deleteFromQueue={handleDeleteFromQueue}
                openPopup={setSelectedItem}
                userId={userId}
            />

            {/* Edit Customer Popup */}
            <QueuePopup
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                saveChanges={handleSaveChanges}
                closePopup={() => setSelectedItem(null)}
            />
        </div>
    );
};

export default Queue;
