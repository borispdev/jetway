import Table from "../common/table";
import AddButton from "../airline/addButton";
import DeleteButton from "../common/deleteButton";
const CustomersTable = ({
  data,
  onDelete,
  sortColumn,
  onSort,
  airline,
}) => {

  const columns = [
    { path: "id", label: "ID" },
    { path: "user_id", label: "User ID" },  
    { path: "username", label: "Username" },  
    { path: "first_name", label: "First Name" },
    { path: "last_name", label: "Last Name" },
    { path: "address", label: "Address" },
    { path: "phone_no", label: "Phone No." },
    { path: "credit_card", label: "Payment card" },
    {
      key: "delete",
      content: (item) => (
        <DeleteButton 
          onDelete={()=> onDelete(item.id)}
        />
      ),
    }, 
  ];

  return (
    <div className="col">
      {airline && 
          <div className="row">
            <AddButton to="/airlines/addflight" />
          </div>
      }
      <div className="row">
        <Table
          data={data}
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    </div>
  );
};

export default CustomersTable;
