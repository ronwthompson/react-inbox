import React, { Component } from 'react';

class Message extends Component {
  constructor(props){
    super(props)

    this.messageFunctions = this.props.messageFunctions
  }

  starsCallingBack = e => {
    this.messageFunctions.starClick(this.props.seed.id)
  }

  selectCallingBack = e => {
    this.messageFunctions.selectClick(this.props.seed.id)
  }
  
  render() {
    let messageClasses = this.props.seed.read ? "row message read" : "row message unread"
    const starred = this.props.seed.starred ? "star fa fa-star" : "star fa fa-star-o"
    if(this.props.seed.selected){
      messageClasses += " selected"
    }
    return (
      <div className={ messageClasses }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={ this.selectCallingBack } checked={ this.props.seed.selected ? 'checked' : ''}/>
            </div>
            <div className="col-xs-2">
              <i className={ starred } key='what' onClick={ this.starsCallingBack }></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { this.props.seed.labels.map((label, i) => <span className="label label-warning" key={ i }>{ label }</span>) }
          <a>
            { this.props.seed.subject }
          </a>
        </div>
      </div>
    )
  }
}

export default Message;