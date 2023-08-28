import React, { useState, useEffect } from "react";
import { sortData } from "../../services/dataUtils";
import { toast } from "react-toastify";
import _ from 'lodash';
import api from "../../services/api";
import Pagination from "../common/pagination";
import TicketsTable from './../common/ticketsTable';
import LoadingSpinner from "../common/loadingSpinner";

// Customers tickets component
const Tickets = ({dataSource}) => {
    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState([]); // tickets data
    const [currentPage, setCurrentPage] = useState(1); // current page.
    const [totalItems, setTotalItems] = useState(0); // total records quantity.
    const [pageSize, setPageSize] = useState(10); // items per page size.
    const [totalPages, setTotalPages] = useState(0); // total pages.
    const [queryString, setQueryString] = useState(`${dataSource}?page=${currentPage}&size=${pageSize}`); // query string template.
    const [sortColumn, setSortColumn] = useState({ path: "departure", order: "asc" }); // default sort column.
    
    // Get tickets from api.
    const getData = async (query) => {
        setLoading(true);
        await api.get(query)
        .then((response) => {
            if (response.data.items.length === 0) {
                toast.warning("No tickets found.");
                setLoading(false)
            } else {
                setLoading(false);
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
    
    // Assemble query string function.
    const formQuery = (page, size) => {
        const query = `${dataSource}?page=${page}&size=${size}`;
        setQueryString(query);
    };

    // Change query string on page or page size change.
    useEffect(() => {
        formQuery(currentPage, pageSize);
      },[pageSize, currentPage]);
    
    // get new data from api on query string change. 
    useEffect(() => {
        getData(queryString);
    }, [queryString]);

    // delete ticket.
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

    // change sort column
    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    };

    // change current page
    const handlePageChange = (page) => {
        if (page === "... ") {
        setCurrentPage(1)
        } else if (page === " ...") {
        setCurrentPage(totalPages)
        } else {
        setCurrentPage(page)
        }
    };
    
    // change page size and recalculate new current page
    const handlePageSizeChange = (e) => {
        const firstItem = pageSize * (currentPage - 1) + 1;
        const newSize = e.target.value
        const newPage = Math.ceil(firstItem / newSize);
        setPageSize(newSize);
        handlePageChange(newPage);
    };
    
    // sort data
    const sortedData = sortData(tickets, sortColumn);

    return ( 
        <>
        <div className="container">
                {sortedData.length !== 0 && !loading ? (
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
            {loading &&
                <div className="position-absolute top-50 start-50 translate-middle">
                    <LoadingSpinner loading={loading} />
                </div>
            }
            </>
        );
}
 
export default Tickets;
