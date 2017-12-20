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
      selectAll: this.selectAll.bind(this),
      markRead: this.markRead.bind(this),
      markUnread: this.markUnread.bind(this),
      deleteEmail: this.deleteEmail.bind(this),
      selectAddLabel: this.selectAddLabel.bind(this),
      selectRemoveLabel: this.selectRemoveLabel.bind(this)
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
    unreadEmails: countUnread(),
    anySelected: false,
    addLabel: '',
    removeLabel: '',
    allSelected: false
  }

  async selectAll() {
    if (this.state.allMail.every(e => e.selected)){
      await this.setState(previous => {
        let allMail = previous.allMail.map(box => { return {...box, selected: false} })
        return {...previous, allMail}
      })
    } else {
      await this.setState(previous => {
        let allMail = previous.allMail.map(box => { return {...box, selected: true} })
        return {...previous, allMail}
      })
    }
    this.setState(previous => {
      return {...previous, anySelected: this.anySelected(), allSelected: this.allSelected()}
    })
  }

  async markRead() {
    await this.setState(previous => {
      let allMail = previous.allMail.map(select => select.selected ? {...select, read: true} : select)
      return {...previous, allMail}
    })
    this.setState(previous => {
      return {...previous, unreadEmails: this.numUnread()}
    })
  }

  async markUnread() {
    await this.setState(previous => {
      let allMail = previous.allMail.map(select => select.selected ? {...select, read: false} : select)
      return {...previous, allMail}
    })
    this.setState(previous => {
      return {...previous, unreadEmails: this.numUnread()}
    })
  }

  deleteEmail(){
    this.setState(previous => {
      for (let i = previous.allMail.length-1; i > -1; i--){
        if (previous.allMail[i].selected){
          previous.allMail.splice(i,1)
        } 
      }
      return {...previous, unreadEmails: this.numUnread()}
    })
  }

  addLabel(){
    this.setState(previous => {
      for (let i = previous.allMail.length-1; i > -1; i--){
        if (previous.allMail[i].selected){
          if (!previous.allMail[i].labels.find(el => el == this.state.addLabel) && this.state.addLabel != 'Add Label'){
            previous.allMail[i].labels.push(this.state.addLabel)
          }
        } 
      }
      return {...previous}
    })
  }

  removeLabel(){
    this.setState(previous => {
      for (let i = previous.allMail.length-1; i > -1; i--){
        if (previous.allMail[i].selected){
          if (previous.allMail[i].labels.find(el => el == this.state.addLabel) && this.state.addLabel != 'Add Label'){
            const temp = previous.allMail[i].labels.findIndex(el => el == this.state.addLabel)
            previous.allMail[i].labels.splice(temp, 1)
          }
        } 
      }
      return {...previous}
    })
  }

  async selectAddLabel(e){
    const temp = e.target.value
    await this.setState(previous => {
      return {...previous, addLabel: temp}
    })
    this.addLabel()
  }

  async selectRemoveLabel(e){
    const temp = e.target.value
    await this.setState(previous => {
      return {...previous, addLabel: temp}
    })
    this.removeLabel()
  }

  starClick(id) {
    this.setState(previous => {
      let allMail = previous.allMail.map(star => star.id === id ? {...star, starred: !star.starred} : star)
      return {...previous, allMail}
    })
  }

  async selectClick(id) {
    await this.setState(previous => {
      let allMail = previous.allMail.map(select => select.id === id ? {...select, selected: !select.selected} : select)
      return {...previous, allMail}
    })
    this.setState(previous => {
      return {...previous, anySelected: this.anySelected(), allSelected: this.allSelected()}
    })
  }

  anySelected(){
    for (let i = 0; i < this.state.allMail.length; i++){
      if (this.state.allMail[i].selected) return true
    }
    return false
  }

  allSelected(){
    return this.state.allMail.every(el => el.selected)
  }

  numUnread(){
    let count = 0
    for (let i = 0; i < this.state.allMail.length; i++){
      if (!this.state.allMail[i].read) count++
    }
    return count
  }

  render() {
    return (
      <div className='container'>
        <Toolbar toolbarFunctions={ this.toolbarFunctions } unread={ this.state.unreadEmails } buttons={ this.state.anySelected } allSelected={ this.state.allSelected } />
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
