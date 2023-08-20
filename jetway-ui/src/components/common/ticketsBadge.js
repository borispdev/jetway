import { useState, useEffect } from "react";

// Badge component with style dependant on tickets quantity.
const TicketsBadge = ({ tickets }) => {
  
  // tickets - tickets number.
  const [badgeClass, setBadgeClass] = useState("badge text-bg-primary");
  const [badgeNumber, setBadgeNumber] = useState(tickets);

  useEffect(() => {
    if (tickets === 0) {
      setBadgeClass("badge bg-danger");
      setBadgeNumber("Sold");
    } else if (tickets < 20) {
      setBadgeClass("badge text-bg-warning");
    } else {
      setBadgeClass("badge text-bg-primary");
    }
  }, [tickets]);

  return <span className={badgeClass}>{badgeNumber}</span>;
};

export default TicketsBadge;
