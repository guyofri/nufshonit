import React from "react";
import { useDispatch } from "react-redux";
import { IFilter } from "../../models/queue";
import { getByFilters } from "../../services/queueService";
import { setFilteredList } from "../../store/queueSlice";

interface QueueFilterProps {
    filter: IFilter;
    setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const QueueFilter: React.FC<QueueFilterProps> = ({ filter, setFilter }) => {
    const dispatch = useDispatch();

    const getByFiltersHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("token")!;
            const filteredList = await getByFilters(token, filter);
            dispatch(setFilteredList(filteredList)); 
            console.log('from queueFilter.tsx = ',filteredList)
        } catch (error) {
            console.error("Error fetching filtered list:", error);
        }
    };

    return (
        <div>
            <h2>סינון</h2>
            <form onSubmit={getByFiltersHandler}>
            <table dir="rtl">
                    <tr>
                        <td>שם לקוח</td>
                        <td>
                            <input
                                type="text"
                                placeholder="Filter by Customer Name"
                                value={filter.customerName}
                                onChange={(e) => setFilter({ ...filter, customerName: e.target.value })}
                                style={{ marginRight: "10px", padding: "5px" }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>מתאריך </td>
                        <td>
                            <input
                                type="date"
                                placeholder="Filter by From Created Date"
                                value={filter.fromCreatedDate}
                                onChange={(e) => setFilter({ ...filter, fromCreatedDate: e.target.value })}
                                style={{ marginRight: "10px", padding: "5px" }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td> עד תאריך</td>
                         <td>
                            <input
                            type="date"
                            placeholder="Filter by To Created Date"
                            value={filter.toCreatedDate}
                            onChange={(e) => setFilter({ ...filter, toCreatedDate: e.target.value })}
                            style={{ marginRight: "10px", padding: "5px" }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">חיפוש</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
};

export default QueueFilter;
