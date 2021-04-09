import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const PaginationNavbar = props => {
  const {basepath, numberOfPages, currentPage} = props;
  return (
    <nav
      className="pagination is-small is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        {Array.from({length: numberOfPages}).map((p, idx) => (
          <li
            key={`page/${idx + 1}`}
            onClick={() => props.fetchFunction(idx + 1)}
          >
            <Link
              to={`${basepath}/${idx + 1}`}
              className={`pagination-link ${
                idx + 1 == currentPage ? 'is-current' : ''
              }`}
              aria-label={`Page ${idx + 1}`}
              aria-current="page"
            >
              {idx + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default PaginationNavbar;
