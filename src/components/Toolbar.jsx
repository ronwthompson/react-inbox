import React, { Component } from 'react';

class Toolbar extends Component {
  
  render() {
    let checkStatus = 'fa'
    if (this.props.allSelected) checkStatus += ' fa-check-square-o'
    else if (this.props.buttons) checkStatus += ' fa-minus-square-o'
    else checkStatus += ' fa-square-o'
    return (
      <div className="row toolbar">
        <div className="classol-md-12">
          <p className="pull-right">
            <span className="badge badge">{ this.props.unread }</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={ this.props.toolbarFunctions.composeClick }>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default">
            <i className={ checkStatus } onClick={ this.props.toolbarFunctions.selectAll } ></i>
          </button>

          <button className="btn btn-default" disabled={ !this.props.buttons ? 'disabled' : '' } onClick={ this.props.toolbarFunctions.markRead }>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={ !this.props.buttons ? 'disabled' : '' } onClick={ this.props.toolbarFunctions.markUnread }>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={ !this.props.buttons ? 'disabled' : '' } onChange={ this.props.toolbarFunctions.selectAddLabel }>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={ !this.props.buttons ? 'disabled' : '' } onChange={ this.props.toolbarFunctions.selectRemoveLabel }>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={ !this.props.buttons ? 'disabled' : '' } onClick={ this.props.toolbarFunctions.deleteEmail }>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar;