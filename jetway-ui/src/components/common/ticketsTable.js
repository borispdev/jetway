import Table from "./table";
import DeleteButton from "./deleteButton";

const TicketsTable = ({data, onDelete, sortColumn, onSort}) => {
        
       const columns =  [
            {path: 'id', label: 'Ticket No.'},
            {path: 'flight_id', label: 'Flight No.'},
            {path: 'airline', label: 'Airline'},
            {path: 'origin', label: 'Origin'},
            {path: 'destination', label: 'Destination'},
            {path: 'departure', label: 'Departure time'},
            {
                key: 'delete',
                content: item => (
                    <DeleteButton 
                        onDelete={()=> onDelete(item.id)}
                    />
                    )
            }
        ];
    
        return ( 
            <div className="container">
            <Table
                data={data}
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
                />
        </div>
     );
     
    }
 
export default TicketsTable;