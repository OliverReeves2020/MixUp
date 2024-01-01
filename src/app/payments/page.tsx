import React, { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { Datatable } from "./datatable";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ];
}
async function getDatav(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "success",
            email: "m@example.com",
        },
        // ...
    ];
}

export default function DemoPage() {
    const [data, setData] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure the effect runs only once on mount
    const handleRefresh = async () => {
        try {
            const result = await getDatav();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className="container mx-auto py-10">
            <button onClick={handleRefresh}>Refresh Data</button>
            <Datatable columns={columns} data={data} />
        </div>
    );
}
