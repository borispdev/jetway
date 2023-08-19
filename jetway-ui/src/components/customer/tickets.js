import React, { Component, useState, useEffect } from "react";
import { sortData } from "../../services/dataUtils";
import { toast } from "react-toastify";
import _ from 'lodash';
import api from "../../services/api";
import Pagination from "../common/pagination";
import TicketsTable from './../common/ticketsTable';

const Tickets = ({dataSource}) => {
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [queryString, setQueryString] = useState(`${dataSource}?page=${currentPage}&size=${pageSize}`);
    const [sortColumn, setSortColumn] = useState({ path: "departure", order: "asc" });
    
    const getData = async (query) => {
        await api.get(query)
        .then((response) => {
            if (response.data.items.length === 0) {
                toast.warning("No tickets found.");
            } else {
                setCurrentPage(response.data.page);
                setTotalPages(response.data.pages);
                setTickets(response.data.items);
                setTotalItems(response.data.total);
            }
        })
        .catch((error) => {
            toast.error(`${error.message} \n\n ${error.response.data.detail}`); 
        });
    };
    
    const formQuery = (page, size) => {
        const query = `${dataSource}?page=${page}&size=${size}`;
        setQueryString(query);
    };

    useEffect(() => {
        formQuery(currentPage, pageSize);
      },[pageSize, currentPage]);
    
    useEffect(() => {
        getData(queryString);
    }, [queryString]);

    const handleDelete = async (id) => {
        let tempData = [...tickets];
        tempData = tempData.filter(item => item.id !== id);
        setTickets(tempData);
        await api.delete(`${dataSource}${id}`)
        .then((response) => {
            toast.success('Ticket deleted');
        })
        .catch((error) => {
            toast.error(`${error.message} \n\n ${error.response.data.detail}`);
        });    
    };

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    };

    const handlePageChange = (page) => {
        if (page === "... ") {
        setCurrentPage(1)
        } else if (page === " ...") {
        setCurrentPage(totalPages)
        } else {
        setCurrentPage(page)
        }
    };
      
    const handlePageSizeChange = (e) => {
        const firstItem = pageSize * (currentPage - 1) + 1;
        const newSize = e.target.value
        const newPage = Math.ceil(firstItem / newSize);
        setPageSize(newSize);
        handlePageChange(newPage);
    };
      
    const sortedData = sortData(tickets, sortColumn);

    return ( 
        <div className="container">
                {sortedData.length !== 0 ? (
                <>
                    <div className="row mt-4">
                        <TicketsTable
                            data={sortedData}
                            sortColumn={sortColumn}
                            onDelete={handleDelete}
                            onSort={handleSort}
                        />
                    </div>
                    <div className="row">
                        <Pagination
                            itemsCount={totalItems}
                            pagesCount={totalPages}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            sizeOptions={[10, 30, 50, 100]}
                            onPageChange={handlePageChange}
                            onSizeChange={handlePageSizeChange}
                        />
                    </div>
                </>
                ) : (null)
                }
            </div>
        );
}
 
export default Tickets;
