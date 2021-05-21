import React, { useEffect, useState } from 'react'
import Employe from './../models/employe'
import { useTable, usePagination } from 'react-table'

import {
    UseColumnOrderInstanceProps,
    UseExpandedInstanceProps,
    UseFiltersInstanceProps,
    UseGlobalFiltersInstanceProps,
    UseGroupByInstanceProps,
    UsePaginationInstanceProps,
    UseRowSelectInstanceProps,
    UseRowStateInstanceProps,
    UseSortByInstanceProps,
} from 'react-table'
declare module 'react-table' {

    export interface TableInstance<D>
        extends UseColumnOrderInstanceProps<D>,
        UseExpandedInstanceProps<D>,
        UseFiltersInstanceProps<D>,
        UseGlobalFiltersInstanceProps<D>,
        UseGroupByInstanceProps<D>,
        UsePaginationInstanceProps<D>,
        UseRowSelectInstanceProps<D>,
        UseRowStateInstanceProps<D>,
        UseSortByInstanceProps<D> { }

    export interface TableState<D>
        extends UseColumnOrderState<D>,
        UseExpandedState<D>,
        UseFiltersState<D>,
        UseGlobalFiltersState<D>,
        UseGroupByState<D>,
        UsePaginationState<D>,
        UseResizeColumnsState<D>,
        UseRowSelectState<D>,
        UseRowStateState<D>,
        UseSortByState<D> { }
}
const Employees = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Email',
                        accessor: 'email',
                    },
                    {
                        Header: 'Position',
                        accessor: 'position',
                    },
                ],
            },
        ],
        []
    )
    const [data, setEmployess] = useState<Employe[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [newUser, setNewUser] = useState([]);
    async function addUser() {
        try {
            const response = await fetch('https://60a63e14b970910017eb1174.mockapi.io/api/v1/employees', {
                method: 'POST',
            });
            const res = await response.json();
            let newEmployees = [...data];
            newEmployees.unshift(res)
            setEmployess(newEmployees)
        }
        catch (error) {
            console.log(error)
        }
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    )
    useEffect(() => {
        fetch('https://60a63e14b970910017eb1174.mockapi.io/api/v1/employees?page=1&limit=100').then(res => res.json().then(r => setEmployess(r)))
    }, [])
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {console.log(page)}
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    <button onClick={() => addUser()}>Add new user</button>
                </span>{' '}
            </div>

        </div>
    )
}

export default Employees;