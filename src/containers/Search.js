import React, { Component } from 'react';
import './css/Search.css';

class Search extends Component {
  state = {
    searchEntry: '',
    totalProducts: 0,
    products: [],
    notFound: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.searchProducts();
    this.props.stateUpdate(this.state);
    this.props.numberOfPages();
    this.clearSearchInput();
  }

  handleChange = (e) => {
    this.setState({
      searchEntry: e.target.value,
    });
  }

  searchProducts = () => {
    let userKeywords = this.state.searchEntry.toLowerCase().trim().split(' ').filter(word => word.length > 0);
    userKeywords = userKeywords.filter(keyword => (keyword !== 'de' && keyword !== 'com'));
    
    const filteredResult = this.props.productsDb.filter(product => {
      const matchesAll = userKeywords.every(userKeyword => (product.keywords.search(userKeyword) >= 0))

      if (matchesAll) {
        return (product.keywords.indexOf(userKeywords[0] >= 0));
      } else {
        return null;
      }
    });

    if (filteredResult.length !== 0) {
      this.setState({
        totalProducts: filteredResult.length,
        products: filteredResult,
        notFound: false,
        currentPage: 1
      });
    } else {
      this.setState({
        notFound: true
      });
    } 
  }

  clearSearchInput = () => {
    this.setState({
      searchEntry: '',
      totalProducts: 0,
      products: [],
      notFound: false
    });
  }

  render() {
    return (
      <div className="menu d-flex j-end al-center">
        <form onSubmit={this.handleSubmit} className="d-flex j-center al-center">
          <i className="fas fa-search" />
          <input onChange={this.handleChange} id="search" type="text" placeholder="O que você está procurando?" value={this.state.searchEntry} />
          <button id="btn-search"><i className="fas fa-times"></i></button>
        </form>
      </div>
    );
  }
}

export default Search;