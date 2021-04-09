import queryString from "query-string";

export const parseQueryOptions = (location) => {
  const query = queryString.parse(location);
  const optionValues = {};

  if (typeof query.page === "string") {
    optionValues.page = parseFloat(query.page);
  }
  if (typeof query.limit === "string") {
    optionValues.limit = parseFloat(query.limit);
  }
  if (typeof query.sort === "string") {
    optionValues.sort = query.sort;
  }

  return optionValues;
};

export const parseQueryFilters = (location) => {
  const query = queryString.parse(location);
  const filterValues = {};

  Object.keys(query).forEach((param) => {
    const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

    if (!mr) {
      return;
    }

    const filterSlug = mr[1];

    filterValues[filterSlug] = query[param];
  });

  return filterValues;
};

export const parseQuery = (location) => {
  return [parseQueryOptions(location), parseQueryFilters(location)];
};

export const buildQuery = (options, filters) => {
  const params = {};

  if (options.page !== 1) {
    params.page = options.page;
  }

  if (options.limit !== 12) {
    params.limit = options.limit;
  }

  if (options.sort !== "default") {
    params.sort = options.sort;
  }

  Object.keys(filters)
    .filter((x) => x !== "category" && !!filters[x])
    .forEach((filterSlug) => {
      params[`filter_${filterSlug}`] = filters[filterSlug];
    });

  return queryString.stringify(params, { encode: false });
};
