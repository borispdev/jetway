import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { sortData } from "../services/dataUtils";
import { formatDateTime } from "../services/dateFormat";
import api from "../services/api";
import moment from "moment";
import FlightsTable from "./common/flightsTable";
import FlightSearchBar from "./flightSearchBar";
import Pagination from "./common/pagination";
import LoadingSpinner from "./common/loadingSpinner";

// Flights component
const Flights = ({dataSource, search, airline}) => {
  
  // dataSource - api base path.
  // search - show search component.
  // airline - enable airline mode.
  const [loading, setLoading] = useState(false); // loading spinner state
  const [flights, setFlights] = useState([]); // flights data
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [totalItems, setTotalItems] = useState(0); // total records quantity from api
  const [pageSize, setPageSize] = useState(30); // page size from api
  const [totalPages, setTotalPages] = useState(0); // total pages from api
  const [queryString, setQueryString] = useState(`${dataSource}?page=${currentPage}&size=${pageSize}`); // query string template.
  const [sortColumn, setSortColumn] = useState({ path: "departure", order: "asc" }); // default sort column.

  // get flights data from api.
  const getData = async (query) => {
    setLoading(true);
    await api.get(query)
    .then((response) => {
      if (response.data.items.length === 0) {
        toast.warning("No flights found.");
        setLoading(false)
      } else {
        setLoading(false);
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

  // Assemble query string
  const formQuery = (search, page, size) => {
    const query = `${dataSource}?page=${page}&size=${size}${search}`;
    setQueryString(query)
  }

  // Reassemble query string on page or page size change.
  useEffect(() => {
    formQuery('', currentPage, pageSize);
  }, [pageSize, currentPage]);

  // Query api on query string change.
  useEffect(() => {
    getData(queryString);
  }, [queryString]);
  
  // Format flights dates from ISO to more readable format.
  const formatDates = (items) => {
    items.forEach((item) => {
      item.departure = formatDateTime(item.departure);
      item.landing = formatDateTime(item.landing);
    });
    setFlights(items);
  };

  // Search button click handler
  const handleSearch = async (searchParams) => {
    if (
      searchParams.origin === "" ||
      searchParams.destination === "" ||
      searchParams.departure === ""
    ) {
      toast.error("Please fill in the serch parameters.");
    } else {
      // search using only date part of datetime
      searchParams.departure = moment(searchParams.departure).format('YYYY-MM-DD');
      // reassemble query string with search parameters.
      formQuery(`&origin=${searchParams.origin}&destination=${searchParams.destination}&date=${searchParams.departure}`,1 ,pageSize);
    }
  };

  // Delete flight api call
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

  // Call api to buy ticket.
  const handleBooking = async (id) => {
    await api.post("/tickets/", { flight_id: id })
      .then((response) => {
        toast.success("New ticket added.");
      })
      .catch((error) => {
        toast.error(`${error.message} \n\n ${error.response.data.detail}`);
      });
  };

  // sort column change
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  // current page change
  const handlePageChange = (page) => {
    if (page === "... ") {
      setCurrentPage(1)
    } else if (page === " ...") {
      setCurrentPage(totalPages)
    } else {
      setCurrentPage(page)
    }
  };
  
  // change page size and recalculate new page.
  const handlePageSizeChange = (e) => {
    const firstItem = pageSize * (currentPage - 1) + 1;
    const newSize = e.target.value
    const newPage = Math.ceil(firstItem / newSize);
    setPageSize(newSize);
    handlePageChange(newPage);
  };

  const sortedFlights = sortData(flights, sortColumn);

  return (
    <>
    <div className="row">
      {!airline && 
      <div className="row mt-4 justify-content-center">
        <FlightSearchBar
          handleSearch={handleSearch}
          search={search}
        />
      </div>
      }
      {sortedFlights.length !== 0 && !loading ? (
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
    {loading &&
      <div className="position-absolute top-50 start-50 translate-middle">
        <LoadingSpinner loading={loading} />
      </div>
    }
    </>
  );
}
 
export default Flights;