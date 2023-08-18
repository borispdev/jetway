import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { formatDateTime } from "../services/dateFormat";
import api from "../services/api";
import moment from "moment";
import FlightsTable from "./common/flightsTable";
import FlightSearchBar from "./flightSearchBar";
import Pagination from "./common/pagination";

const Flights = ({dataSource, search, airline}) => {

  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [queryString, setQueryString] = useState(`${dataSource}?page=${currentPage}&size=${pageSize}`);
  const [sortColumn, setSortColumn] = useState({ path: "departure", order: "asc" });

  const getData = async (query) => {
   await api.get(query)
    .then((response) => {
      if (response.data.items.length === 0) {
        toast.warning("No flights found.");
      } else {
        setCurrentPage(response.data.page);
        setTotalPages(response.data.pages);
        formatDates(response.data.items);
        setTotalItems(response.data.total);
      }
    })
    .catch((error) => {
      toast.error(`${error.message} \n\n ${error.response.data.detail}`);
    });
  }

  const formQuery = (search, page, size) => {
    const query = `${dataSource}?page=${page}&size=${size}${search}`;
    setQueryString(query)
  }

  useEffect(() => {
    formQuery('', currentPage, pageSize);
  }, [pageSize, currentPage]);

  useEffect(() => {
    getData(queryString);
  }, [queryString]);
  
  const formatDates = (items) => {
    items.forEach((item) => {
      item.departure = formatDateTime(item.departure);
      item.landing = formatDateTime(item.landing);
    });
    setFlights(items);
  };

  const handleSearch = async (searchParams) => {
    if (
      searchParams.origin === "" ||
      searchParams.destination === "" ||
      searchParams.departure === ""
    ) {
      toast.error("Please fill in the serch parameters.");
    } else {
      searchParams.departure = moment(searchParams.departure).format('YYYY-MM-DD');
      formQuery(`&origin=${searchParams.origin}&destination=${searchParams.destination}&date=${searchParams.departure}`,1 ,pageSize);
    }
  };

  const sortData = (flights, sortColumn) => {
    const sortedData = _.orderBy(flights, [sortColumn.path], [sortColumn.order]);
    return sortedData
  };

  const handleDelete = async (id) => {
    let tempFlights = [...flights];
    tempFlights = tempFlights.filter(flight => flight.id !== id);
    setFlights(tempFlights);
    await api.delete(`/flights/${id}`)
        .then((response) => {
          toast.success(`Flight deleted.`);
        })
        .catch((error) => {
          toast.error(`${error.message} \n\n ${error.response.data.detail}`);
        });
  };

  const handleBooking = async (id) => {
    await api.post("/tickets/", { flight_id: id })
      .then((response) => {
        toast.success("New ticket added.");
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

  const sortedFlights = sortData(flights, sortColumn);

  return (
    <div className="row">
      <div className="row mt-4 justify-content-center">
        <FlightSearchBar
          handleSearch={handleSearch}
          search={search}
        />
      </div>
      {sortedFlights.length !== 0 ? (
        <>
          <div className="row mt-4">
            <FlightsTable
              data={sortedFlights}
              sortColumn={sortColumn}
              onDelete={handleDelete}
              // onUpdate={handleUpdate}
              onPurchase={handleBooking}
              onSort={handleSort}
              airline={airline}
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
      ) : null}
    </div>
  );
}
 
export default Flights;