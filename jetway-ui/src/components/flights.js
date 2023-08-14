import React, { Component, useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { formatDateTime } from "../services/dateFormat";
import api from "../services/api";
import moment from "moment";
import FlightsTable from "./common/flightsTable";
import FlightSearchBar from "./flightSearchBar";
import Pagination from "./common/pagination";
import { paginate } from "./../services/paginate";


const Flights = ({dataSource, search, airline}) => {

  const [flights, setFlights] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [pages, setPages] = useState(1)
  const [sortColumn, setSortColumn] = useState({ path: "departure", order: "asc" })

  const getData = async (endpoint) => {
   await api.get(`${endpoint}?page=${currentPage}&size=${pageSize}`)
    .then((response) => {
      formatDates(response.data.items);
      setCurrentPage(response.data.page);
      setPages(response.data.pages);
    })
    .catch((error) => {
      toast.error(`${error.message} \n\n ${error.response.data.detail}`)
    });
  }

  useEffect(() => {
    getData(dataSource);
  },[currentPage, pageSize, dataSource])
  
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
      await api.get(`/flights/?page=${1}&size=${pageSize}&origin=${searchParams.origin}&destination=${searchParams.destination}&date=${searchParams.departure}`)
        .then((response) => {
          if (response.data.items.length === 0) {
            toast.warning("No flights found.");
            return null;
          }
          formatDates(response.data.items);
          setCurrentPage(response.data.page);
          setPages(response.data.pages);
        })
          .catch(error => {
          toast.error(`${error.message} \n\n ${error.response.data.detail}`);
        });
    }
  };

  const sortData = (flights, sortColumn) => {
    const sortedData = _.orderBy(flights, [sortColumn.path], [sortColumn.order])
    return sortedData
  }

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
    setCurrentPage(page);
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
              // KsonUpdate={handleUpdate}
              onPurchase={handleBooking}
              onSort={handleSort}
              airline={airline}
            />
          </div>
          <div className="row">
            <Pagination
              // itemsCount={totalCount}
              pagesCount={pages}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
 
export default Flights;


// class Flights extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       flights: [],
//       currentPage: 1,
//       pageSize: 20,
//       sortColumn: { path: "departure", order: "asc" },
//     };
//   }

  // getData = async (endpoint) => {
  //   await api.get(endpoint)
  //     .then((response) => {
  //       this.formatDates(response.data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // };

  // componentDidMount = () => {
  //   this.getData(this.props.dataSource);
  // };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.dataSource !== this.props.dataSource) {
  //     this.getData(this.props.dataSource);
  //   }
  // }

  // getProcessedData = () => {
  //   const {
  //     flights: allFlights,
  //     sortColumn,
  //     currentPage,
  //     pageSize,
  //   } = this.state;
  //   const sorted = _.orderBy(allFlights, [sortColumn.path], [sortColumn.order]);
  //   const flightsProcessed = paginate(sorted, currentPage, pageSize);
  //   return { totalCount: sorted.length, data: flightsProcessed };
  // };

  // formatDates = (items) => {
  //   items.forEach((item) => {
  //     item.departure = formatDateTime(item.departure);
  //     item.landing = formatDateTime(item.landing);
  //   });
  //   this.setState({ flights: items, currentPage: 1});
  // };

  // handleSearch = async (searchParams) => {
  //   if (
  //     searchParams.origin === "" ||
  //     searchParams.destination === "" ||
  //     searchParams.departure === ""
  //   ) {
  //     toast.error("Please fill in the serch parameters.");
  //   } else {
  //     searchParams.departure = moment(searchParams.departure).format('YYYY-MM-DD');
  //     await api.get(`/flights/?origin=${searchParams.origin}&destination=${searchParams.destination}&date=${searchParams.departure}`)
  //       .then((response) => {
  //         if (response.data.length === 0) {
  //           toast.warning("No flights found.");
  //           return null;
  //         }
  //         this.formatDates(response.data);
  //       }).catch(error => {
  //         toast.error(error.message);
  //       });
  //   }
  // };

  // handleDelete = async (id) => {
  //   let tempFlights = [...this.state.flights];
  //   tempFlights = tempFlights.filter(flight => flight.id !== id);
  //   this.setState({flights: tempFlights});
  //   await api.delete(`/flights/${id}`)
  //       .then((response) => {
  //         toast.success(`Flight deleted.`);
  //       })
  //       .catch((error) => {
  //         toast.error(error.message);
  //       });
  // };

  // handleBooking = async (id) => {
  //   await api.post("/tickets/", { flight_id: id })
  //     .then((response) => {
  //       toast.success("New ticket added.");
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  // handleSort = (sortColumn) => {
  //   this.setState({ sortColumn });
  // };

  // handlePageChange = (page) => {
  //   this.setState({ currentPage: page });
  // };

//   render() {
//     const { sortColumn, pageSize, currentPage } = this.state;
//     const { totalCount, data: flightsProcessed } = this.getProcessedData();
//     return (
//       <div className="row">
//         <div className="row mt-4 justify-content-center">
//           <FlightSearchBar
//             handleSearch={this.handleSearch}
//             search={this.props.search}
//           />
//         </div>
//         {flightsProcessed.length !== 0 ? (
//           <>
//             <div className="row mt-4">
//               <FlightsTable
//                 data={flightsProcessed}
//                 sortColumn={sortColumn}
//                 onDelete={this.handleDelete}
//                 onUpdate={this.handleUpdate}
//                 onPurchase={this.handleBooking}
//                 onSort={this.handleSort}
//                 airline={this.props.airline}
//               />
//             </div>
//             <div className="row">
//               <Pagination
//                 itemsCount={totalCount}
//                 pageSize={pageSize}
//                 currentPage={currentPage}
//                 onPageChange={this.handlePageChange}
//               />
//             </div>
//           </>
//         ) : null}
//       </div>
//     );
//   }
// }

// export default Flights;
