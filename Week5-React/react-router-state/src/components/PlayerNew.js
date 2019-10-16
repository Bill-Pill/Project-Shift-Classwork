import { Link } from 'react-router-dom'
import React from 'react'

class PlayerNew extends React.Component {
  constructor () {
    super ()

    this.state = {
      name: '',
      number: '',
      position: ''
    }

    this.handleSubmitPlayerClick = this.handleSubmitPlayerClick.bind(this)
  }

  handleSubmitPlayerClick () {
    const newPlayer = {
      name: this.state.name,
      number: this.state.number,
      position: this.state.position
    };

    this.props.addPlayer(newPlayer)
    // this.props.props.history.push('/roster')
  }

  render () {
    return (
      <div>
        <form>
        <label>Name</label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ name: event.target.value })
        }/>

        <br/>

        <label>Number</label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ number: parseInt(event.target.value, 10) })
        }/>

        <br/>

        <label>Position</label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ position: event.target.value })
        }/>

        <button type="button" onClick={this.handleSubmitPlayerClick}>Submit</button>
        </form>

        <Link to='/roster'>Roster</Link>
      </div>
    )
  }
}

export default PlayerNew
