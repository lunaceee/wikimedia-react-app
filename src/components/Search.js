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
      this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(obj)
        if (!(obj && obj.query && obj.query.search)) return [];
        let results = obj.query.search;
        this.displayResults(results);
      }).catch(x => {console.error(x)});
    }

    //Handle change method.
    handleChange(event) {
      this.setState({
        term: event.target.value,

      });
      // if more than 3 characters are typed, start searching
      // Now, if other characters are typed after this, should cancel previous searches
      // also, as we are searching, perhaps a wait icon would be cool
      // if(event.target.value === ''){
      //     this.setState({
      //       term: '',
      //       searchResults: []
      //   })
      // }
      // else {
      //   this.fetchData()
      // }
    }

    //Handle submit method.
    handleSubmit(event) {
      event.preventDefault();

      if(!this.state.term){
        return
      }
      console.log('A name was submitted: ' + this.state.term);
      
      this.setState({
        searchResults:[]
      })
      //put a spinner
      this.fetchData(this.state.term);
    }

    //Display results method.
    displayResults(results){
      let newState = {
        term: this.state.term, 
        searchResults: results.map(
          (x, i) => {
            return {
              key: i,
              title: x.title, 
              snippet: x.snippet
            }
          }
        )
      }
      this.setState(newState)      
    }


    renderOneResult(result){
      const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`)
        return (
          <div className="resultItem" key={result.key}>
            <h3 className="resultItem-title">
              <a href={url} target="_blank" rel="noreferrer">{result.title}</a>
            </h3>
            {result.snippet.replace(/<[^>]*>/g, '')}<br />
            <a href={url} className="resultItem-link" target="_blank" rel="noreferrer">{url}</a>
          </div>
        )
    }

    //renderSpinner method
    renderSpinner(){
      
    }

    render(){
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              What are you looking for? <br />
              <input placeholder="Type in here..." type="text" value={this.state.term} onChange={this.handleChange} />
              <button className="btn btn-default">submit</button>
            </label>
          </form>
          <div>
            {
              this.state.searchResults.map(result => {
                return this.renderOneResult(result)
              })
            }
          </div>
            
        </div>
      );
    }
}

export default SearchBar;