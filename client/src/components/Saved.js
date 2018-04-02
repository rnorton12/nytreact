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

class Saved extends Component {

  componentDidMount() {

  };

  handleDelete = (item) => {
    {this.props.delete(item)}
  };

  render() {
    console.log(this.props);
    return (
      <div className="row">
        <div className="col-sm-12">
           <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
              </div>
            </div>
              <div className="panel-body" id="saved-section">
                {this.props.save.map((item, index) => (
                  <div className="saved" id={index} key={item._id}>
                    <HeadLine id={index} headline={item.headline}/>
                    <ByLine byline={item.byline} />
                    <a href={item.web_url}>{item.web_url}</a>
                    <button onClick={() => this.handleDelete(item)} className="btn btn-primary" type="button">Delete</button>
                  </div>
                ))}
              </div>
        </div>
      </div>
    );
  }
}

export default Saved;
