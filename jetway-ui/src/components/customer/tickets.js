import React, { Component } from "react";
import { formatDateTime } from "../../services/dateFormat";
import { toast } from "react-toastify";
import _ from 'lodash'
import api from "../../services/api";
import Pagination from "../common/pagination";
import { paginate } from '../../services/paginate';
import TicketsTable from './../common/ticketsTable';

class Tickets extends Component {
    state = {
        tickets: [],
        currentPage: 1,
        pageSize: 5,
        sortColumn: {path: 'departure', order: 'asc'}
    };
    
    getTickets = async () => {
        await api.get('/tickets/')
            .then(response => {
                this.formatDates(response.data);
            })
            .catch(error => {
                toast.error(error.message);
            });
    };
    
    componentDidMount() {
        this.getTickets();
    }
    
    getProcessedData = () => {
        const {tickets: allTickets, sortColumn, currentPage, pageSize} = this.state;
        const sorted = _.orderBy(allTickets, [sortColumn.path], [sortColumn.order]);
        const ticketsProcessed = paginate(sorted, currentPage, pageSize);
        return {totalCount: sorted.length, data: ticketsProcessed};
    }

    formatDates = items => {
        items.forEach(item => {
            item.departure = formatDateTime(item.departure);
        });
        this.setState({tickets: items});
    }
    
    handleDelete = async id => {
        await api.delete(`/tickets/${id}`)
            .then(response => {
                let ticketsTemp = this.state.tickets.filter(ticket => ticket.id !== id);
                this.setState({tickets: ticketsTemp});
                toast.success(`Ticket deleted.`);
            })
            .catch(error => {
                toast.error(error);
            });
    }


    handleSort = sortColumn => {
        this.setState({sortColumn});
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    }

    render() {

        const {sortColumn, pageSize, currentPage} = this.state;
        const {totalCount, data: ticketsProcessed} = this.getProcessedData();
        
        return (
            <div className="container">
                {ticketsProcessed.length !== 0 ? (

                <>
                <div className="row mt-4">
                    <TicketsTable
                        data={ticketsProcessed}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onUpdate={this.handleUpdate}
                        onPurchase={this.handleBooking}
                        onSort={this.handleSort}
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
                ) : (null)
                }
            </div>
    
         );
    };
}    
 
export default Tickets;

