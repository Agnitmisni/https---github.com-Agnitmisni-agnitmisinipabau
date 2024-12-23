import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../queries.ts';
import { useState, useEffect } from 'react';
import './DataTable.css';

interface DataTableProps {
    language: 'de' | 'en';
}

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
}

export default function DataTable({ language }: DataTableProps) {
    const getLocalizedColumns = (): GridColDef[] => {
        return [
            { field: 'name', headerName: language === 'en' ? 'Name' : 'Name', width: 150, sortable: true, filterable: false },
            { field: 'status', headerName: language === 'en' ? 'Status' : 'Status', width: 130, sortable: true, filterable: true },
            { field: 'species', headerName: language === 'en' ? 'Species' : 'Spezies', width: 150, sortable: true, filterable: true },
            { field: 'gender', headerName: language === 'en' ? 'Gender' : 'Geschlecht', width: 130, sortable: true, filterable: false },
            { field: 'origin', headerName: language === 'en' ? 'Origin' : 'Herkunft', width: 180, sortable: true, filterable: false },
        ];
    };

    const [localizedColumns, setLocalizedColumns] = useState<GridColDef[]>(getLocalizedColumns());
    const [rows, setRows] = useState<Character[]>([]);
    const [page] = useState(0);
    const [pageSize] = useState(5);

    const { data, loading, error } = useQuery(GET_CHARACTERS, {
        variables: { page },
    });

    useEffect(() => {
        if (data) {
            setRows(
                data.characters.results.map((x: any) => ({
                    id: x.id,
                    name: x.name,
                    status: x.status,
                    species: x.species,
                    gender: x.gender,
                    origin: x.origin.name,
                }))
            );
        }
    }, [data]);

    useEffect(() => {
        setLocalizedColumns(getLocalizedColumns())
    }, [language]);


    const paginationModel = { page, pageSize };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="data-table-container">
            <Paper className="paper-container">
                <DataGrid
                    pagination
                    rows={rows}
                    columns={localizedColumns}
                    initialState={{
                        pagination: {
                            paginationModel,
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}
