import React, { Component } from 'react';
// import SearchResults from './SearchResults.js';

class SearchBar extends Component {
    constructor(props){
      super(props);
      this.state = {
        term: '',
        searchResults: []
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.displayResults = this.displayResults.bind(this);
    }

    //fetch data from API.
    fetchData(){
      // const t = this;
      
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");//customize header.

      let myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors'
      };

      var myURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${this.state.term}`;

      let myRequest = new Request(myURL, myInit)
      
      fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((obj) => {
        var results = obj.query.search;
        this.displayResults(results);
      })
    }


    handleChange(event) {
      this.setState({
        term: event.target.value
      });
    }

    handleSubmit(event) {
      if(!this.state.term){
        return
      }
      console.log('A name was submitted: ' + this.state.term);
      this.fetchData();
      event.preventDefault();
    }

    displayResults(results){
      if(!this.state.term){
        return
      }
      // Loop over results array
      results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        let createResults = () => {
          const searchResults = document.querySelector(".search-results");

          searchResults.insertAdjacentHTML("beforeend",
            `<div class="resultItem">
              <h3 class="resultItem-title">
                <a href="${url}" target="_blank" rel="noreferrer">${result.title}</a>
              </h3>
              <span class="resultItem-snippet">${result.snippet}</span><br>
              <a href="${url}" class="resultItem-link" target="_blank" rel="noreferrer">${url}</a>
            </div>`
          );
        }

        this.setState = {
          searchResults: createResults()
        }

      });
    }

    render(){
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              What are you looking for? <br />
              <input type="text" value={this.state.term} onChange={this.handleChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
          <div className="search-results" onSubmit={this.displayResults}>
            {this.state.searchResults}
          </div>
        </div>
      );
    }
}

export default SearchBar;