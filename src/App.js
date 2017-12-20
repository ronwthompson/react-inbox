import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import Message from './components/Message';
import MessageList from './components/MessageList';
import seeds from './components/seeds';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.toolbarFunctions = {
      selectAll: this.selectAll.bind(this)
    }

    this.messageFunctions = {
      starClick: this.starClick.bind(this),
      selectClick: this.selectClick.bind(this)
    }
  }

  state = {
    allMail: seeds.map(e => {
                return {
                  ...e,
                  selected: false
                }
              }),
    unreadEmails: countUnread()
  }

  selectAll() {
    if (this.state.allMail.every(e => e.selected)){
      this.setState(previous => {
        let allMail = previous.allMail.map(box => { return {...box, selected: false} })
        return {...previous, allMail}
      })
    } else {
      this.setState(previous => {
        let allMail = previous.allMail.map(box => { return {...box, selected: true} })
        return {...previous, allMail}
      })
    }
  }

  starClick(id) {
    this.setState(previous => {
      let allMail = previous.allMail.map(star => star.id === id ? {...star, starred: !star.starred} : star)
      return {...previous, allMail}
    })
  }

  selectClick(id) {
    this.setState(previous => {
      let allMail = previous.allMail.map(select => select.id === id ? {...select, selected: !select.selected} : select)
      return {...previous, allMail}
    })
  }

  render() {
    return (
      <div className='container'>
        <Toolbar toolbarFunctions={ this.toolbarFunctions } unread={ this.state.unreadEmails }/>
        <MessageList messageFunctions={ this.messageFunctions } seeds={ this.state.allMail }/>
      </div>
    )
  }
}

function countUnread(){
  let count = 0
  for (let i = 0; i < seeds.length; i++){
    if (!seeds[i].read) count++
  }
  return count
}

export default App;
