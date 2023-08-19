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


const DataAdmin = ({dataSortColumn, dataSource, entity}) => {
  
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [queryString, setQueryString] = useState(`${dataSource}?page=${currentPage}&size=${pageSize}`);
  const [sortColumn, setSortColumn] = useState(dataSortColumn);
  
  const getData = async (query) => {
    await api.get(query)
    .then((response) => {
      if (response.data.items.length === 0) {
        toast.warning("No records found.");
      } else {
        setCurrentPage(response.data.page);
        setTotalPages(response.data.pages);
        setData(response.data.items);
        setTotalItems(response.data.total);
      }
    })
    .catch((error) => {
      toast.error(`${error.message} \n\n ${error.response.data.detail}`);
    });
  };

  const formQUery = (page, size) => {
    const query = `${dataSource}?page=${page}&size=${size}`;
    setQueryString(query);
  };

  useEffect(() => {
    setData([])
    formQUery(1, pageSize);
  }, [dataSource]);
  
  useEffect(() => {
    formQUery(currentPage, pageSize);
  },[pageSize, currentPage]);

  useEffect(() => {
    getData(queryString);
  }, [queryString]);

  const handleDelete = async (id) => {
    let tempData = [...data];
    tempData = tempData.filter(item => item.id !== id);
    setData(tempData);
    await api.delete(`${dataSource}${id}`)
      .then((response) => {
        toast.success(`${entity} deleted.`);
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

  const sortedData = sortData(data, sortColumn);

  return ( 
    <div className="row">
        {sortedData.length !== 0 ? (
          <>
            <div className="row mt-4">
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
   );
}
 
export default DataAdmin;