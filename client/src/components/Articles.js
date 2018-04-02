import React, { Component } from "react";
import API from "../utils/API";
import Results from "./Results";
import Saved from "./Saved";
class Articles extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    articles: [],
    searchTerm: "",
    startYear: 0,
    endYear: 0,
    savedArticles: []
  };

  componentDidMount() {
    this.loadArticles();
  }

   // load saved articles
   loadArticles = () => {
    API.getArticles()
    //  .then(res => console.log(res.data))
      .then(res => this.setState({ savedArticles: res.data}))
      .catch(err => console.log(err));
  };

   deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err)); 
  };

  saveArticle = article => {
    API.saveArticle(article)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleDeleteArticle = article => {
    this.deleteArticle(article._id);
  };

  handleSavedArticle = article => {
    function removeArticle (item) {
      return item._id !== article._id;
    }
    const filtered = this.state.articles.filter(removeArticle);
    this.setState({ articles: filtered });
    
    const data = {
      headline: article.headline.main,
      byline: article.original,
      web_url: article.web_url
    };

    this.saveArticle(data);
  };

  //handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  searchArticles = query => {
    API.search(query)
      .then(res => this.setState({ articles: res.data.response.docs }))
      .catch(err => console.log(err));

      console.log(this.state.articles);
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleFormSearch = event => {
    event.preventDefault();
    this.searchArticles(this.state.searchTerm);
  };

  render() {
    console.log("articles: ", this.state.articles);

    const results = (this.state.articles.length) ? (
      <Results save={this.handleSavedArticle} articles={this.state.articles}/>
    ) : (null);

    const saved = (this.state.savedArticles.length) ? (
      <Saved delete={this.handleDeleteArticle} save={this.state.savedArticles}/>
    ) : (null);

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
            </div>
            <div className="panel-body">
              <form>
               
                <div className="form-group">
                  <label htmlFor="search">Search Term:</label>
                  <input type="text"
                     className="form-control"
                     name="searchTerm"
                     value={this.state.searchTerm}
                     onChange={this.handleInputChange}
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="startYear">Start Year (Optional):</label>
                  <input type="text" 
                    className="form-control"
                    name="startYear"
                    id="start-year"
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                  />
                </div>

                
                <div className="form-group">
                  <label htmlFor="endYear">End Year (Optional):</label>
                  <input type="text"
                  className="form-control"
                  name="endYear"
                  id="end-year"
                  value={this.state.endYear}
                  onChange={this.handleInputChange}
                  />
                </div>
      
                <button onClick={this.handleFormSearch} type="submit" className="btn btn-default" id="run-search">
                  <i className="fa fa-search"></i>
                   Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          {results}
        </div>
        <div>
          {saved}
        </div>
      </div>
    );
  }
}

export default Articles;
