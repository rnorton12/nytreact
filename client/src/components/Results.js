import React, { Component } from "react";

const HeadLine = props => {
  if (props.headline !== "null") {
    return <h3 className="articleHeadline">
    <span className="label label-primary">{props.id}</span>
    <strong>{props.headline}</strong></h3>
  } else {
    return null
  }
};

const ByLine = props => {
  if (props.byline && props.byline.original) {
    return <h5>{props.byline.original}</h5>
  } else {
    return null
  }
};

class Results extends Component {

  componentDidMount() {

  };

  handleSave = (item) => {
    {this.props.save(item)}
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
           <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
              </div>
            </div>
            <div className="panel-body" id="well-section">
              {this.props.articles.map((item, index) => (
                <div className="well" id={index} key={item._id}>
                  <HeadLine id={index + 1} headline={item.headline.main}/>
                  <ByLine byline={item.byline} />
                  <h5>Section: {item.section_name}</h5>
                  <h5>{item.pub_date}</h5>
                  <a href={item.web_url} target="_blank">{item.web_url}</a>
                  <div>
                    <br/>
                    <button onClick={() => this.handleSave(item)} className="btn btn-primary" type="button">Save</button>
                  </div>  
                </div>
              ))}
            </div>
        </div>
      </div>
    );
  }
}

export default Results;
