import React, { Component } from 'react';
import './css/Pagination.css';

class Pagination extends Component {
  state = {
    currentPage: 1,
    prevButtonsClasses: 'page disable-button',
    nextButtonsClasses: 'page',
    onePageScenario: 'page disable-button',
  };

  componentDidUpdate = () => {
    if (this.props.products.currentPage === 1 && this.state.prevButtonsClasses === 'page') {
      this.setState( {
        currentPage: 1,
        prevButtonsClasses: 'page disable-button',
        nextButtonsClasses: 'page'
      } );
    };
  }

  goToFirstPage = async () => {
    this.updateState(1);
    await this.props.onChange(1);
    this.checkDisableButtons();
  }

  goToLastPage = async () => {
    this.updateState(this.props.products.numberOfPages); 
    await this.props.onChange(this.props.products.numberOfPages);
    this.checkDisableButtons();
  }

  goToNextPage = async () => {
    await this.updateState(this.state.currentPage +  1);
    await this.props.onChange(this.state.currentPage);
    this.checkDisableButtons();
  }

  goToPreviousPage = async () => {
    this.updateState(this.state.currentPage -  1);
    await this.props.onChange(this.state.currentPage -  1);
    this.checkDisableButtons();
  }

  updateState = (number) => {
    this.setState( {
      currentPage: number
    } );
  }

  checkDisableButtons = () => {
    if (this.props.products.currentPage === this.props.products.numberOfPages) {
      this.setState( {
        prevButtonsClasses: 'page',
        nextButtonsClasses: "page disable-button",
      } );
    } else if (this.props.products.currentPage === 1) {
      this.setState( {
        prevButtonsClasses: "page disable-button",
        nextButtonsClasses: 'page'
      } );
    } else {
      this.setState( {
        prevButtonsClasses: 'page',
        nextButtonsClasses: 'page'
      } );
    }
  }

  handleClick = async (e) => {        
    this.setState( {
      currentPage: Number(e.target.innerText)
    } );

    const pgNumber = Number(e.target.innerText);
    await this.props.onChange(pgNumber);
    this.checkDisableButtons();
  }

  render() {
    const numberOfPages = this.props.products.numberOfPages;
    const currentPage = this.props.products.currentPage;
    let pages = [];

    for (let i = 1; i <= this.props.products.numberOfPages; i++) {
      pages.push(i);
    }

    let restrictedPages;

    if (currentPage < 6) {
      restrictedPages = pages.filter(page => page <= 6);
    }

    if (currentPage >= 6 && currentPage !== numberOfPages) {
      restrictedPages = pages.filter(page => page >= currentPage - 4 && page <= currentPage + 1);
    } 

    if (currentPage === numberOfPages) {
      restrictedPages = pages.filter(page => page >= currentPage - 5 && page <= currentPage);
    }

    const pageButtons = restrictedPages.map(page => {
      return <li key={`page-${page}`}>
        <button className={currentPage === page ? "page active-btn" : "page"} onClick={this.handleClick}>{page}</button>
        </li>
      });

    return (
      <div className="pages-container">
        <ul className="d-flex j-between">
          <button className={numberOfPages === 1 ? this.state.onePageScenario : this.state.prevButtonsClasses} onClick={this.goToFirstPage} ><i className="fas fa-angle-double-left"></i></button>
          <button className={numberOfPages === 1 ? this.state.onePageScenario : this.state.prevButtonsClasses} onClick={this.goToPreviousPage} ><i className="fas fa-angle-left"></i></button>
          { pageButtons }
          <button className={numberOfPages === 1 ? this.state.onePageScenario : this.state.nextButtonsClasses} onClick={this.goToNextPage} ><i className="fas fa-angle-right"></i></button>
          <button className={numberOfPages === 1 ? this.state.onePageScenario : this.state.nextButtonsClasses} onClick={this.goToLastPage} ><i className="fas fa-angle-double-right"></i></button>
        </ul>
      </div>
    );
  }
}

export default Pagination;