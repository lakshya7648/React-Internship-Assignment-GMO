import { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';


export default function UserTable() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const [data, setData] = useState<any[]>([]);


    // defining structure as an interface to get the data from api 
    interface record {
        userid: number;
        id: number;
        title: string;
        body: string;
    }

    const rs: any[] = [];
    const cols: GridColDef[] = [
        { field: "userid", headerName: "User ID" },
        { field: "id", headerName: "ID" },
        { field: "title", headerName: "Title", width: 400 },
        { field: "body", headerName: "Description", width: 400 },
    ]

    // function for fetching data from api
    const fetchData = async () => {
        let count: number = 0;
        try {
            const result = await fetch(url).then((res) => {
                return res.json() as Promise<record>;
            });

            // Storing the data into the rs for creating rows for datagrid
            for (let y in result) {
                const data = {
                    id: result[y as keyof object]['id'],
                    userid: result[y as keyof object]['userId'],
                    title: result[y as keyof object]['title'],
                    body: result[y as keyof object]['body'],
                }
                if (Object.isExtensible(rs)) {
                    rs.push(data);
                    count++;
                }
            }
        } catch (error: any) {
            console.log(error.message);
        }
        // updating the state with the current data for if any kind of change
        setData(rs)
    }

    // useEffect hook to fetch data when component is about to render
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <Typography variant="h3" style={{ marginBottom: "20px", marginTop: "20px", textAlign: 'center' }}>Data</Typography>
            <DataGrid rows={data} columns={cols} initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
            }}
                pageSizeOptions={[5, 10, 25]} />
        </div>
    )
}
