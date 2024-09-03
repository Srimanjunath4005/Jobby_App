import './index.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import {Component} from 'react'


class Login extends Component {
  state = {username: 'rahul', password: 'rahul@2021', showErrorMsg: false, errorMsg: ''}

  onchangeusername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    this.props.navigate('/');
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="input-cont">
        <label htmlFor="username" className="label-style">
          USERNAME
        </label>
        <input
          type="text"
          className="input-style"
          id="username"
          placeholder="Username"
          value={username}
          onChange={this.onchangeusername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-cont">
        <label htmlFor="password" className="label-style">
          PASSWORD
        </label>
        <input
          type="password"
          className="input-style"
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onchangePassword}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-bg-cont">
        <form className="login-form-cont" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="log-website-logo-style"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-style">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

const LoginWithNavigate = (props) => {
    const navigate = useNavigate()
    return <Login {...props} navigate={navigate} />
  }
  
export default LoginWithNavigate

