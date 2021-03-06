import React, {PureComponent} from 'react';
import {StyledContainer, StyledPagesize, StyledNav, StyledButton, StyledPageIndicator} from './Styles';
import PropTypes from 'prop-types';

const PAGE_SIZE_RANGE = 10;

class Pagination extends PureComponent {
  onPageChange = pageNo => {
    const {pageSize, total, onPageChange} = this.props;
    // Check that pageNo is in valid range as per the pagesize.
    if (pageNo <= total/pageSize && typeof onPageChange === 'function') {
      onPageChange(pageNo);
    }
  };

  onPageSizeChange = e => {
    const newPageSize = (+e.target.value);
    const {onPageSizeChange, pageSize} = this.props;
    if (pageSize !== newPageSize) {
      onPageSizeChange(newPageSize);
    }
  };

  onFirst = () => {
    this.onPageChange(1);
  };

  onLast = () => {
    const {pageSize, total} = this.props;
    this.onPageChange(total/pageSize);
  };

  onNext = () => {
    const {pageNo, pageSize, total} = this.props;
    if (pageNo + 1 <= total/pageSize) {
      this.onPageChange(pageNo + 1);
    }
  };

  onPrev = () => {
    const {pageNo} = this.props;
    if (pageNo - 1 >= 1) {
      this.onPageChange(pageNo - 1);
    }
  };

  getOptions = () => {
    const {pageNo, pageSize, total} = this.props;
    let options = [];
    let currOption = PAGE_SIZE_RANGE;
    let pageSizeAvailable;
    while (currOption <= total) {
      if (!pageSizeAvailable) {
        pageSizeAvailable = currOption === pageSize;
      }
      options.push(<option key={currOption} value={currOption}>{currOption} Rows</option>)
      currOption += PAGE_SIZE_RANGE;
    }

    if (!pageSizeAvailable) {
      options.unshift(<option key={pageSize} value={pageSize}>{pageSize} Rows</option>);
    }
    
    return options;
  };

  render() {
    const {pageNo, pageSize, total} = this.props;
    const from = (pageNo <= 1 ? 0 : (pageNo - 1) * pageSize) + 1;
    const to = pageNo * pageSize;
    return (
      <StyledNav>
        <StyledContainer>
          <StyledButton title="First" onClick={this.onFirst} disabled={from === 1 ? 'disabled' : undefined}>&lt;&lt;</StyledButton>
          <StyledButton title="Previous" onClick={this.onPrev} disabled={from === 1 ? 'disabled' : undefined}>&lt;</StyledButton>
          <StyledPagesize onChange={this.onPageSizeChange} value={pageSize}>
            {this.getOptions()}
          </StyledPagesize>
          <StyledButton title="Next" onClick={this.onNext} disabled={to === total ? 'disabled' : undefined}>&gt;</StyledButton>
          <StyledButton title="Last" onClick={this.onLast} disabled={to === total ? 'disabled' : undefined}>&gt;&gt;</StyledButton>
        </StyledContainer>
        <StyledPageIndicator>
          <span>{from}</span> to <span>{to}</span> of <span>{total}</span>
        </StyledPageIndicator>
      </StyledNav>
    );
  }
}

Pagination.propTypes = {
  /**
   * The page which should be rendered initially.
   */
  pageNo: PropTypes.number,

  /**
   * Pagesize of the table.
   */
  pageSize: PropTypes.number,

  /**
   * Total number of records
   */
  total: PropTypes.number,

  /**
   * Function to be invoked when pageNo is changed.
   */
  onPageChange: PropTypes.func,

  /**
   * Function to be invoked when pageSize is changed.
   */
  onPageSizeChange: PropTypes.func
};

export default Pagination;
