import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { sortData } from "../../services/dataUtils";
import api from "../../services/api";
import Pagination from "../common/pagination";
import CustomersTable from "./customersTable";
import AirlinesTable from "./airlinesTable";
import AdminsTable from "./adminsTable";
import UsersTable from "./usersTable";
import LoadingSpinner from "../common/loadingSpinner";

// Parent component for rendering admin panel tables (users, customers, airlines, admins).
const DataAdmin = ({dataSortColumn, dataSource, entity}) => {
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // data from API.
  const [currentPage, setCurrentPage] = useState(1); // Current active page.
  const [totalItems, setTotalItems] = useState(0); // Total items from API.
  const [pageSize, setPageSize] = useState(30); // Pagination page size. 
  const [totalPages, setTotalPages] = useState(0); // Total data pages from API.
  const [queryString, setQueryString] = useState(`${dataSource}?page=${currentPage}&size=${pageSize}`); // Query string template.
  const [sortColumn, setSortColumn] = useState(dataSortColumn); // Current column by which items are sorted.
  
  // Get data from API.
  const getData = async (query) => {
    setLoading(true);
    await api.get(query)
    .then((response) => {
      if (response.data.items.length === 0) {
        toast.warning("No records found."); // Display message if nothing found.
        setLoading(false)
      } else {
        setLoading(false);
        setCurrentPage(response.data.page); 
        setTotalPages(response.data.pages);
        setData(response.data.items);
        setTotalItems(response.data.total);
      }
    })
    .catch((error) => {
      toast.error(`${error.message} \n\n ${error.response.data.detail}`); // Display API error.
    });
  };

  // Create and assign query string from api address, page number and page size.
  const formQUery = (page, size) => {
    const query = `${dataSource}?page=${page}&size=${size}`;
    setQueryString(query);
  };

  // Reset data if another item on admin panel menu selected.
  useEffect(() => {
    setData([])
    formQUery(1, pageSize);
  }, [dataSource]);
  
  // Reassemble query string on page number or size change.
  useEffect(() => {
    formQUery(currentPage, pageSize);
  },[pageSize, currentPage]);

  // Get new data on query string change.
  useEffect(() => {
    getData(queryString);
  }, [queryString]);

  // Delete record.
  const handleDelete = async (id) => {
    // Delete row from visible table.
    let tempData = [...data];
    tempData = tempData.filter(item => item.id !== id);
    setData(tempData);

    // Query API to delete record with the given ID.
    await api.delete(`${dataSource}${id}`)
      .then((response) => {
        toast.success(`${entity} deleted.`); // Display success message.
      })
      .catch((error) => {
        toast.error(`${error.message} \n\n ${error.response.data.detail}`); // Display error message.
      });
  };

  // Change column or order by which items are sorted.
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  // Change current page.
  const handlePageChange = (page) => {
    if (page === "... ") {
      setCurrentPage(1)
    } else if (page === " ...") {
      setCurrentPage(totalPages)
    } else {
      setCurrentPage(page)
    }
  };
  
  // Change page size, recalculate and set new page based on new size.
  const handlePageSizeChange = (e) => {
    const firstItem = pageSize * (currentPage - 1) + 1;
    const newSize = e.target.value
    const newPage = Math.ceil(firstItem / newSize);
    setPageSize(newSize);
    handlePageChange(newPage);
  };

  // Sort data.
  const sortedData = sortData(data, sortColumn);

  return (
    <>
    <div className="row">
        {sortedData.length !== 0 && !loading ? (
          <>
            <div className="row mt-4">
              {/* Display Tables based on selected entity */}
              {entity === 'User' && 
                <UsersTable
                  data={sortedData}
                  sortColumn={sortColumn}
                  onDelete={handleDelete}
                  onSort={handleSort}
                />
              }
              {entity === 'Airline' && 
                <AirlinesTable
                  data={sortedData}
                  sortColumn={sortColumn}
                  onDelete={handleDelete}
                  onSort={handleSort}
                />
              }
              {entity === 'Customer' &&
                <CustomersTable
                  data={sortedData}
                  sortColumn={sortColumn}
                  onDelete={handleDelete}
                  onSort={handleSort}
                />
              }
              {entity === 'Admin' &&
                <AdminsTable
                  data={sortedData}
                  sortColumn={sortColumn}
                  onDelete={handleDelete}
                  onSort={handleSort}
                />
              }
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
        ) : null}
      </div>
      {loading &&
        <div className="position-absolute top-50 start-50 translate-middle">
          <LoadingSpinner loading={loading} />
        </div>
      }
      </>
   );
}
 
export default DataAdmin;