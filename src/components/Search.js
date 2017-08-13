import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props){
      super(props);
      this.state = {
        term: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // var page = 'https://en.wikipedia.org/?curid=';

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
      console.log(myURL);
      
      fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((obj) => {
        var results = obj.query.search;
        console.log(results);
        var searchResult = results.map((result) => {
          return result.snippet;
        })
      })
    }


    handleChange(event) {
      console.log(event);
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
          <div className="container">
            <div className="row">
              {this.state.result}
            </div>
          </div>
        </div>
      );
    }
}

export default SearchBar;