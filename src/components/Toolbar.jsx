import React, { Component } from 'react';

class Toolbar extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="row toolbar">
        <div className="classol-md-12">
          <p className="pull-right">
            <span className="badge badge">{ this.props.unread }</span>
            unread messages
          </p>

          <button className="btn btn-default">
            <i className="fa fa-square-o" onClick={ this.props.toolbarFunctions.selectAll } ></i>
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Read
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled="disabled">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled="disabled">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled="disabled">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar;