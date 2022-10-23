const getPagination = (page, itemPerPage) => {
  return { skip: (page - 1) * itemPerPage, limit: itemPerPage };
};

module.exports = getPagination;
