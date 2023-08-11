import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { formatDateTime } from "../services/dateFormat";
import api from "../services/api";
import moment from "moment";
import FlightsTable from "./common/flightsTable";
import FlightSearchBar from "./flightSearchBar";
import Pagination from "./common/pagination";
import { paginate } from "./../services/paginate";

class Flights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      currentPage: 1,
      pageSize: 5,
      sortColumn: { path: "departure", order: "asc" },
    };
  }

  getData = async (endpoint) => {
    await api.get(endpoint)
      .then((response) => {
        this.formatDates(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  componentDidMount = () => {
    this.getData(this.props.dataSource);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.dataSource !== this.props.dataSource) {
      this.getData(this.props.dataSource);
    }
  }

  getProcessedData = () => {
    const {
      flights: allFlights,
      sortColumn,
      currentPage,
      pageSize,
    } = this.state;
    const sorted = _.orderBy(allFlights, [sortColumn.path], [sortColumn.order]);
    const flightsProcessed = paginate(sorted, currentPage, pageSize);
    return { totalCount: sorted.length, data: flightsProcessed };
  };

  formatDates = (items) => {
    items.forEach((item) => {
      item.departure = formatDateTime(item.departure);
      item.landing = formatDateTime(item.landing);
    });
    this.setState({ flights: items });
  };

  handleSearch = async (searchParams) => {
    if (
      searchParams.origin === "" ||
      searchParams.destination === "" ||
      searchParams.departure === ""
    ) {
      toast.error("Please fill in the serch parameters.");
    } else {
      searchParams.departure = moment(searchParams.departure).format('YYYY-MM-DD');
      await api.get(`/flights/?origin=${searchParams.origin}&destination=${searchParams.destination}&date=${searchParams.departure}`)
        .then((response) => {
          if (response.data.length === 0) {
            toast.warning("No flights found.");
            return null;
          }
          this.formatDates(response.data);
        }).catch(error => {
          toast.error(error.message);
        });
    }
  };

  handleDelete = async (id) => {
    let tempFlights = [...this.state.flights];
    tempFlights = tempFlights.filter(flight => flight.id !== id);
    this.setState({flights: tempFlights});
    await api.delete(`/flights/${id}`)
        .then((response) => {
          toast.success(`Flight deleted.`);
        })
        .catch((error) => {
          toast.error(error.message);
        });
  };

  handleBooking = async (id) => {
    await api.post("/tickets/", { flight_id: id })
      .then((response) => {
        toast.success("New ticket added.");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { sortColumn, pageSize, currentPage } = this.state;
    const { totalCount, data: flightsProcessed } = this.getProcessedData();
    return (
      <div className="row">
        <div className="row mt-4">
          <FlightSearchBar
            handleSearch={this.handleSearch}
            search={this.props.search}
          />
        </div>
        {flightsProcessed.length !== 0 ? (
          <>
            <div className="row mt-4">
              <FlightsTable
                data={flightsProcessed}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
                onPurchase={this.handleBooking}
                onSort={this.handleSort}
                airline={this.props.airline}
              />
            </div>
            <div className="row">
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default Flights;
