import Table from "../common/table";
import DeleteButton from "../common/deleteButton";

//Parent component for rendering admin customers table.
const CustomersTable = ({
  data, // Data fetched from api.
  onDelete, // Delete function of parent component.
  sortColumn, // Current column by which items are sorted.
  onSort, // Sort function from parent component.
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
