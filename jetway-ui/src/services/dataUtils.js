import _ from "lodash";

export function sortData(data, sortColumn) {
    const sortedData = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    return sortedData;
  };