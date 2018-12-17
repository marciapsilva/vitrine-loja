import React, { Component } from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './css/App.css';
import Search from './Search';
import Products from '../components/Products';
import ItemsPerPage from '../components/ItemsPerPage';
import Pagination from './Pagination';


class App extends Component {
  state = {
    totalProducts: 0,
    productsDb: [],
    searchEntry: '',
    notFound: false,
    totalFound: 0,
    productsFound: [],
    productsPerPage: 6,
    numberOfPages: 0,
    currentPage: 1,
    firstItemOnPage: function() { 
      return this.productsPerPage * (this.currentPage - 1);
    },
  };

  componentDidMount = () => {
    fetch('https://ammotest-products-api.herokuapp.com/products')
    .then(res => res.json())
    .then(data => {
      this.setState( { 
        totalProducts: data.products.length,
        productsDb: data.products,
        numberOfPages: Math.ceil(data.products.length / this.state.productsPerPage),
      } )
    });
  };

  searchResult = (data) => {
    this.setState( {
      searchEntry: data.searchEntry,
      notFound: data.notFound,
      totalFound: data.totalProducts,
      productsFound: data.products,
      currentPage: 1
    } );
  }

  itemsPerPage = async (e) => {
    await this.setState( {
      productsPerPage: Number(e.target.value),
      currentPage: 1
    } );
    this.numberOfPages();
  }

  numberOfPages = () => {
    let numberOfPages = 0;

    if (this.state.totalFound > 0) {
      numberOfPages = Math.ceil(this.state.totalFound / this.state.productsPerPage);
    } else if (this.state.notFound) {
      numberOfPages = 0;
    } else {
      numberOfPages = Math.ceil(this.state.totalProducts / this.state.productsPerPage);
    }

    this.setState( {
      numberOfPages
    } );
  }

  pageChange = (number) => {
    this.setState( {
      currentPage: number
    } );
  }

  render() {
    // console.log('render');
    // console.log(this.state);
    // console.log(this.state.firstItemOnPage());
    // console.log('main ' + this.state.currentPage);

    return (
        <div className="App">
          <header>
            <nav className="d-flex j-between al-center">
              <div className="logo">mmartan</div>
              <Search stateUpdate={this.searchResult} productsDb={this.state.productsDb} numberOfPages={this.numberOfPages}/>
            </nav>
          </header>
          <main>
            <Products products={this.state} />
            {/* <Switch>
              <Route exact path='/' component={ProductList} />
              <Route path='/search?:keyword/:number-of-pages/page-:page' component={SearchResults} />
            </Switch> */}
            <div className="d-flex fd-column j-center">
                { !this.state.notFound ? 
                  <div className="pagination-container d-flex fd-row j-between al-baseline">
                    <ItemsPerPage onChange={this.itemsPerPage} />
                    <Pagination onChange={this.pageChange} products={this.state} />
                  </div> :
                  null }
            </div>
          </main>
        </div>
    );
  }
}

export default App;