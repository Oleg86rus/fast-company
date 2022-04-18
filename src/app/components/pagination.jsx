import React, {useEffect} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({itemsCount, pageSize, onPageChange, currentPage, clearFilter}) => {
    const amountOfPeople = itemsCount;
    const pageChanging = onPageChange;
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);
    useEffect(()=> {
        if (amountOfPeople === 0) clearFilter();
    });
    useEffect(() => {
        if (amountOfPeople % pageSize === 0 && currentPage > amountOfPeople / pageSize) pageChanging(amountOfPeople / pageSize);
    }, [itemsCount]);
    return (
        <>
            {currentPage.length === 0 ? null : (
                <nav>
                    {pages.length > 1 && (
                        <ul className="pagination">
                            {pages.map((page) => (
                                <li
                                    key={'page_' + page}
                                    className={
                                        'page-item' + (page === currentPage ? ' active' : '')
                                    }
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => onPageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}
                        </ul>)}
                </nav>
            )}
        </>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    clearFilter: PropTypes.func
};
export default Pagination;
