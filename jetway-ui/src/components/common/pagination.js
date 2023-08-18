import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';

const Pagination = ({pagesCount, currentPage, onPageChange, onSizeChange, pageSize, sizeOptions}) => {
    
    const pagesRange = (childrenPages) => {
        let totalPagesInRange = 7 + childrenPages;
        if (totalPagesInRange >= pagesCount) {
            return _.range(1, pagesCount + 1);
        }

        let leftChildrenIndex = Math.max(currentPage - childrenPages, 1);
        let rightChildrenIndex = Math.min(currentPage + childrenPages, pagesCount);
        let leftDots = leftChildrenIndex > 2;
        let rightDots = rightChildrenIndex < pagesCount - 2;

        if (!leftDots && rightDots) {
            let leftPagesCount = 3 + 2 * childrenPages;
            let leftPages = _.range(1, leftPagesCount + 1);
            return [...leftPages, " ...", pagesCount];
        } else if (leftDots && !rightDots) {
            let rightPagesCount = 3 + 2 * childrenPages;
            let rightPages = _.range(pagesCount - rightPagesCount + 1, pagesCount + 1);
            return [1, "... ", ...rightPages];
        } else {
            let middlePages = _.range(leftChildrenIndex, rightChildrenIndex + 1);
            return [1, "... ", ...middlePages, " ...", pagesCount];
        }

    }
    
    if (pagesCount === 1) return null;
    // const pages = _.range(1, pagesCount + 1);
    const pages = pagesRange(1)

    return (
       <div className='d-flex flex-row p-2'>
            <div className='p-2'>
                <ul className="pagination">
                    <li key='start' className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                        <span className="page-link" onClick={() => onPageChange(1)}>
                            <FontAwesomeIcon icon={faAnglesLeft}/>
                        </span>
                    </li>
                    <li key='prev' className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                        <span className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                            <FontAwesomeIcon icon={faAngleLeft}/>
                        </span>
                    </li>
                    {
                        pages.map(page =>         
                                <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                                    <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                                </li>
                            )
                    }
                    <li key='next' className={currentPage === pagesCount ? "page-item disabled" : "page-item"}>
                        <span className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </span>
                    </li>
                    <li key='end' className={currentPage === pagesCount ? "page-item disabled" : "page-item"}>
                        <span className="page-link" onClick={() => onPageChange(pagesCount)}>
                            <FontAwesomeIcon icon={faAnglesRight}/>
                        </span>
                    </li>
                </ul>
            </div>
            
            <div className='p-2'>
                <select class="form-select" onChange={(e) => onSizeChange(e)}>
                    {
                        sizeOptions.map(size =>
                                <option key={size} value={size} selected={size === pageSize}>{size}</option>
                            )
                    }
                </select>
            </div>
       </div>
    );
}
 
export default Pagination;