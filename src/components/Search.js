import React, { Component } from 'react';

const SEARCH_REQ_HEADERS = new Headers();
SEARCH_REQ_HEADERS.append("Accept", "application/json");
const REQ_INIT = {
  method: 'GET',
  headers: SEARCH_REQ_HEADERS,
  mode: 'cors'
};
const WIKI_URL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5'

class SearchBar extends Component {
    constructor(props){
      super(props);
      //Set initial state;
      this.state = {
        term: '',
        searchResults: []
      };

      //Bind methods.
      this.handleChange = this.handleChange.bind(this);
      this.displayResults = this.displayResults.bind(this);
    }

    //Fetch data from Wikimedia API.
    fetchData(searchTerm){
      let myURL = WIKI_URL + `&srsearch=${searchTerm}`;

      let myRequest = new Request(myURL, REQ_INIT)
      
      fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((obj) => {
        if (!(obj && obj.query && obj.query.search)) return [];
        let results = obj.query.search;
        this.displayResults(results);
      }).catch(x => {console.error(x)});
    }

    //Handle change method.
    handleChange(event) {
      this.setState({
        term: event.target.value,
        searchResults: this.state.searchResults
      });

      // if more than 3 characters are typed, start searching
      // Now, if other characters are typed after this, should cancel previous searches
      // also, as we are searching, perhaps a wait icon would be cool
      this.fetchData(event.target.value);
    }

    //Handle submit method.
    // handleSubmit(event) {
    //   if(!this.state.term){
    //     return
    //   }
    //   console.log('A name was submitted: ' + this.state.term);
    //   this.fetchData();
    //   event.preventDefault();
    // }

    //
    displayResults(results){
      let newState = {
        term: this.state.term, 
        searchResults: results.map(
          x => {
            return {
              title: x.title, 
              snippet: x.snippet
            }
          }
        )
      }
      this.setState(newState)
      console.log(this.state.searchResults[0].snippet)
      
    }

    
    renderOneResult(results){
      
    }


    render(){

      return(
        <div>
          <form>
            <label>
              What are you looking for? <br />
              <input placeholder="Type in here..." type="text" value={this.state.term} onChange={this.handleChange} />
            </label>
          </form>
            {
              this.state.searchResults.map(result => {
                const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`)
                console.log(url);
                return (
                  <div className="resultItem">
                    <h3 className="resultItem-title">
                      <a href={url} target="_blank" rel="noreferrer">{result.title}</a>
                    </h3>
                    {result.snippet}<br />
                    <a href={url} className="resultItem-link" target="_blank" rel="noreferrer">{url}</a>
                  </div>
                )
              })
            }
        </div>
      );
    }
}

export default SearchBar;