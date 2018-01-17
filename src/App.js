import React, { Component } from 'react'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Compose from './components/Compose'
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
      selectRemoveLabel: this.selectRemoveLabel.bind(this),
      composeClick: this.composeClick.bind(this)
    }

    this.messageFunctions = {
      starClick: this.starClick.bind(this),
      selectClick: this.selectClick.bind(this)
    }
  }

  state = {
    allMail: [],
    unreadEmails: 0,
    anySelected: false,
    addLabel: '',
    removeLabel: '',
    allSelected: false,
    composeOpen: false
  }

  async componentWillMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState(prev => {
      return {
        ...prev,
        unreadEmails: countUnread(json._embedded.messages),
        allMail: json._embedded.messages.map(e => {
                return {
                  ...e,
                  selected: e.selected === undefined ? false : e.selected
                }
              })
      }
    })
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
    let changes = {
      messageIds: this.state.allMail.filter(e => e.selected).map(e => e.id),
      command: "read",
      read: true
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.componentWillMount()
  }

  async markUnread() {
    let changes = {
      messageIds: this.state.allMail.filter(e => e.selected).map(e => e.id),
      command: "read",
      read: false
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.componentWillMount()
  }

  async deleteEmail(){
    let changes = {
      messageIds: this.state.allMail.filter(e => e.selected).map(e => e.id),
      command: "delete"
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.componentWillMount()
  }

  async selectAddLabel(e){
    const labelName = e.target.value
    if (labelName === 'Apply Label') return
    let changes = {
      messageIds: this.state.allMail.filter(e => e.selected).filter(e => !e.labels.includes(labelName)).map(e => e.id),
      command: "addLabel",
      label: labelName
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.componentWillMount()
  }

  async selectRemoveLabel(e){
    const labelName = e.target.value
    if (labelName === 'Remove Label') return
    let changes = {
      messageIds: this.state.allMail.filter(e => e.selected).filter(e => e.labels.includes(labelName)).map(e => e.id),
      command: "removeLabel",
      label: labelName
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.componentWillMount()
  }

  async starClick(id) {
    let changes = {
      messageIds: [ id ],
      command: "star",
      star: this.state.allMail.filter(e => e.id === id)[0].starred ? false : true
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.componentWillMount()
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

  composeClick(){
    this.setState(prev => {
      return {
        ...prev,
        composeOpen: !this.state.composeOpen
      }
    })
  }

  composeMessage = async (e) => {
    e.preventDefault()
    const subject = document.getElementById('composition')[0].value
    const body = document.getElementById('composition')[1].value
    let changes = { subject, body }
    await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    await this.setState(prev => {
      return {
        ...prev,
        composeOpen: false
      }
    })
    this.componentWillMount()
  }

  render() {
    return (
      <div className='container'>
        <Toolbar toolbarFunctions={ this.toolbarFunctions } unread={ this.state.unreadEmails } buttons={ this.state.anySelected } allSelected={ this.state.allSelected } />
        { this.state.composeOpen ? <Compose composeMessage={this.composeMessage} /> : '' }
        <MessageList messageFunctions={ this.messageFunctions } seeds={ this.state.allMail }/>
      </div>
    )
  }
}

function countUnread(arr){
  let count = 0
  for (let i = 0; i < arr.length; i++){
    if (!arr[i].read) count++
  }
  return count
}

export default App;
