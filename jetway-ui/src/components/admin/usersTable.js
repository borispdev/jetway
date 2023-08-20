import Table from "../common/table";
import ButtonGroup from "../common/buttonGroup";

// Parent component for rendering users table. 
const UsersTable = ({data, sortColumn, onSort,}) => {
  
  // Column with routing paths and user roles
  // needed for showing and assigning roles to users.
  const roles = [
    {path: '/admin/newcustomer', name: 'Customer'},
    {path: '/admin/newairline', name: 'Airline'},
    {path: '/admin/newadmin', name: 'Admin'}
  ];
  // users data columns.
  const columns = [
    { path: "id", label: "ID" },
    { path: "username", label: "Username" },  
    { path: "email", label: "Email" },
    {
      label: "Role",
      path: "role_name",
      content: (item) => (
      // Buttons for role assignment.
      <ButtonGroup items={roles} selectedItem={item.role_name} data={item}/>
      )
    }
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

export default UsersTable;
