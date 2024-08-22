import './index.css'

import {Component} from 'react'
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileldata: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.profile_details
      const updatedData = {
        name: fetchedData.name,
        imgUrl: fetchedData.profile_image_url,
        shortBio: fetchedData.short_bio,
      }
      this.setState({
        profileldata: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <button className="retry" onClick={this.getProfileData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots color="#ffffff" height={50} width={50} />
    </div>
  );

  renderProfile = () => {
    const {profileldata} = this.state
    const {imgUrl, name, shortBio} = profileldata

    return (
      <div className="profile-incont">
        <img src={imgUrl} className="profile-img" alt={name}/>
        <h1 className="profile-head">{name}</h1>
        <p className="profile-p">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="profile-cont">
        {apiStatus === 'SUCCESS' && this.renderProfile()}
        {apiStatus === 'FAILURE' && this.renderFailureView()}
        {apiStatus === 'IN_PROGRESS' && this.renderLoadingView()}
      </div>
    )
  }
}

export default Profile