import _ from 'lodash';

// Table body component.
const TableBody = ({data, columns}) => {
    // data - table data.
    // columns - columns object contains title, path.

    // Assign content at item object path.
    const renderCell = (item, column) => {
        if (column.content){
            return column.content(item);
        } 
        return _.get(item, column.path);
    }
    // Create unique key for record or buttons.
    const createKey = (item, column) => {
        return item.id + (column.path || column.key);
    }
    
    return ( 
        <tbody>
            {data.map(item =>
                <tr key={item.id}>
                    {columns.map(column => 
                        <td key={createKey(item, column)}>{renderCell(item, column)}</td>)}
                </tr>
                )}
        </tbody>
     );
}
 
export default TableBody;