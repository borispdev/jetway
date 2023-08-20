import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// Table component consisting of header and body.
const Table = ({data, columns, sortColumn, onSort}) => {
    
    // data - table data.
    // columns - table column object including path, title, key.
    // sortColumn - current sort column.
    // onSort - Sort function prop.
    return ( 
        <table className="table table-striped">
            <TableHeader 
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
                />
            <TableBody
                columns={columns}
                data={data}
                />
        </table>
     );
}
 
export default Table;