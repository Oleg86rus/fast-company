import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


const Pagination = ({itemsCount, pageSize, onPageChange, currentPage}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);
  return (
    <>
      {pageCount === 1 ? null :
        (<nav>
          <ul className="pagination">
            {pages.map((page) => (
              <li key={'page_' + page}
                className={'page-item' + (page === currentPage ? ' active' : '')}>
                <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
              </li>
            ))}

          </ul>
        </nav>)}
    </>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
