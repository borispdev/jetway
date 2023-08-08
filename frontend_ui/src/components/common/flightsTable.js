import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../App";
import Table from "./table";
import AddButton from "../airline/addButton";
import BuyButton from "./buyButton";
import { getCurrentUser } from "../../services/authentication";
import TicketsBadge from "./ticketsBadge";
import DeleteButton from "./deleteButton";
import EditButton from "./editButton";

const FlightsTable = ({
  data,
  onDelete,
  onPurchase,
  sortColumn,
  onSort,
  airline,
}) => {
  const [columns, setColumns] = useState([]);
  const profile = useContext(ProfileContext);

  const defaultColumns = [
    { path: "airline", label: "Airline" },
    { path: "origin", label: "Origin" },
    { path: "destination", label: "Destination" },
    { path: "departure", label: "Departure time" },
    { path: "landing", label: "Landing time" },
  ];

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
          isDisabled={profile.credit_card === null ? true : false }
        />
      )
    };

    const badgeColumn = {
      path: "remaining_tickets",
      label: "Tickets",
      content: (item) => <TicketsBadge tickets={item.remaining_tickets} />,
    };

    const user = getCurrentUser();

    if (airline) {
      defaultColumns.push(badgeColumn);
      defaultColumns.push(editColumn);
      defaultColumns.push(deleteColumn);
    }

    if (user && user.scopes === "customer") {
      defaultColumns.push(buyColumn);
    }
    setColumns(defaultColumns);
  }, [airline, data]);

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

export default FlightsTable;
