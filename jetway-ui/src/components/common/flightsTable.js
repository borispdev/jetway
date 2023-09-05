import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../App";
import Table from "./table";
import AddButton from "../airline/addButton";
import BuyButton from "./buyButton";
import { getCurrentUser } from "../../services/authentication";
import TicketsBadge from "./ticketsBadge";
import DeleteButton from "./deleteButton";
import EditButton from "./editButton";

// Parent control for displaying flights table.
const FlightsTable = ({
  data, // flights data from API.
  onDelete, // on flight delete function prop.
  onPurchase, // on ticket book function prop.
  sortColumn, // current sort column.
  onSort, // Set current sort column function.
  airline, // Display table in airline mode with edit and delete options.
}) => {
  const [columns, setColumns] = useState([]);
  const profile = useContext(ProfileContext); // Get user profile from context.

  const defaultColumns = [
    { path: "airline", label: "Airline" },
    { path: "origin", label: "Origin" },
    { path: "destination", label: "Destination" },
    { path: "departure", label: "Departure time" },
    { path: "landing", label: "Landing time" },
  ];

  // Determine which columns to display based on user.
  useEffect(() => {
    const deleteColumn = {
      key: "delete",
      content: (item) => (
        <DeleteButton 
          onDelete={()=> onDelete(item.id)}
        />
      ),
    };

    const editColumn = {
      key: "edit",
      content: (item) => (
      <EditButton to={'/airlines/editflight'} item={item} />
      ),
    };

    const buyColumn = {
      key: "buy",
      content: (item) => (
        <BuyButton
          param={item.remaining_tickets}
          qty={0}
          onBuy={() => onPurchase(item.id)}
          // if user profile missing credit card, button is disabled.
          isDisabled={profile === {} ? true : false }
        />
      )
    };

    // Show remaining tickets as badge.
    const badgeColumn = {
      path: "remaining_tickets",
      label: "Tickets",
      content: (item) => <TicketsBadge tickets={item.remaining_tickets} />,
    };

  
    const user = getCurrentUser();

    // airline diplay columns.
    if (airline) {
      defaultColumns.push(badgeColumn);
      defaultColumns.push(editColumn);
      defaultColumns.push(deleteColumn);
    }
    // customer display columns.
    if (user && user.scopes === "customer") {
      defaultColumns.push(buyColumn);
    }
    setColumns(defaultColumns);
  }, [airline, data]);

  return (
    <div className="col">
      {/* if user is airline add flight "+" button is displayed */}
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

export default FlightsTable;
