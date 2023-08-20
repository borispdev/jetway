import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'

// Table header component.
const TableHeader = ({sortColumn, columns, onSort}) => {
   
    // Determine sort column and order to raise onSort.
   function raiseSort(path) {
        const tempSortColumn = {...sortColumn};
        if (tempSortColumn.path === path) {
            tempSortColumn.order = tempSortColumn.order === "asc" ? "desc" : "asc";
        } else {
            tempSortColumn.path = path;
            tempSortColumn.order = "asc";
        }
        onSort(tempSortColumn);
    };

    // render icon matching sort order.
   function renderSortIcon(column) {
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <FontAwesomeIcon icon={faSortUp} />;
        return <FontAwesomeIcon icon={faSortDown} />;
    };
     
        return ( 
        <thead>
            <tr>
                {columns.map(column => (
                    <th 
                        className='clickable'
                        key={column.path || column.key} 
                        onClick={() => raiseSort(column.path)}>
                            {column.label} {renderSortIcon(column)}
                    </th>
                ))}
            </tr>
        </thead> 
        );
}
 
export default TableHeader;