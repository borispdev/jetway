import _ from "lodash";

// sort tables data using lodash orderBy method.
export function sortData(data, sortColumn) {
    const sortedData = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    return sortedData;
  };