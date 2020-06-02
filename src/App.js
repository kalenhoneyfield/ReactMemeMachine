import React, { Component } from 'react';
import axios from 'axios'

import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

const APIKEY = process.env.REACT_APP_API_KEY || 'dc6zaTOxFJmzC'

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    }
  } 

  componentDidMount() {
    // axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`)
    // .then(response => {
    //   this.setState({
    //     gifs: response.data.data
    //   })
    // })
    // .catch(error => {
    //   console.log('Error fetching and parsing data', error);
    // })
    this.performSearch()
  }

  performSearch = (query = `yeehaw`) => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=${APIKEY}`)
    .then(response => {
      this.setState({
        gifs: response.data.data,
        loading: false
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    })
  }

  render() { 
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">Kalen's Meme Machine</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading) ? <p>Loading...</p> : <GifList data={this.state.gifs}/>
          }
          
        </div>
      </div>
    );
  }
}
