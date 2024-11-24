// src/components/queue/QueuePopup.tsx
import React from "react";
import { IBarberQueue } from "../../models/queue";

interface QueuePopupProps {
    selectedItem: IBarberQueue | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<IBarberQueue | null>>;
    saveChanges: () => void;
    closePopup: () => void;
}

const QueuePopup: React.FC<QueuePopupProps> = ({ selectedItem, setSelectedItem, saveChanges, closePopup }) => {
    if (!selectedItem) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
                zIndex: 1000,
            }}
        >
            <h3>Edit Customer</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    saveChanges();
                }}
            >
                <label>
                    Customer Name:
                    <input
                        type="text"
                        value={selectedItem.customerName}
                        onChange={(e) =>
                            setSelectedItem({ ...selectedItem, customerName: e.target.value })
                        }
                    />
                </label>
                <br />
                <label>
                    Arrival Time:
                    <input
                        type="datetime-local"
                        value={selectedItem.arrivalTime}
                        onChange={(e) =>
                            setSelectedItem({ ...selectedItem, arrivalTime: e.target.value })
                        }
                    />
                </label>
                <br />
                <button type="submit">Save</button>
                <button type="button" onClick={closePopup}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default QueuePopup;
