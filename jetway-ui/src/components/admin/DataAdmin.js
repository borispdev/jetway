import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import api from "../../services/api";
import Pagination from "../common/pagination";
import { paginate } from "../../services/paginate";
import CustomersTable from "./customersTable";
import AirlinesTable from "./airlinesTable";
import AdminsTable from "./adminsTable";
import UsersTable from "./usersTable";

class DataAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      pageSize: 20,
      sortColumn: this.props.sortColumn,
    };
  };

  getData = async (endpoint) => {
    await api.get(endpoint)
      .then((response) => {
        this.setState({data: response.data});
      })
      .catch((error) => {
        toast.error(`${error.message} \n\n ${error.response.data.detail}`);
      });
  };

  componentDidMount = () => {
    this.getData(this.props.dataSource);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.dataSource !== this.props.dataSource) {
      this.getData(this.props.dataSource);
      this.setState({currentPage: 1});
    }
  };

  getProcessedData = () => {
    const {data: allData, sortColumn, currentPage, pageSize} = this.state;
    const sorted = _.orderBy(allData, [sortColumn.path], [sortColumn.order]);
    const processedData = paginate(sorted, currentPage, pageSize);
    return { totalCount: sorted.length, data: processedData };
  };

  handleDelete = async (id) => {
    let tempData = [...this.state.data];
    tempData = tempData.filter(item => item.id !== id);
    this.setState({data: tempData});
    await api.delete(`${this.props.dataSource}${id}`)
      .then((response) => {
        toast.success(`${this.props.entity} deleted.`);
      })
      .catch((error) => {
        toast.error(`${error.message} \n\n ${error.response.data.detail}`);
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
    const { totalCount, data: processedData } = this.getProcessedData();
    return (
      <div className="row">
        {processedData.length !== 0 ? (
          <>
            <div className="row mt-4">
              {this.props.entity === 'User' && 
                <UsersTable
                  data={processedData}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
              }
              {this.props.entity === 'Airline' && 
                <AirlinesTable
                  data={processedData}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
              }
              {this.props.entity === 'Customer' &&
                <CustomersTable
                  data={processedData}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
              }
              {this.props.entity === 'Admin' &&
                <AdminsTable
                  data={processedData}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
              }
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
  };
}

export default DataAdmin;