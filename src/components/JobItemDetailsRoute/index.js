import {Component} from 'react'
import { ThreeDots } from 'react-loader-spinner'; 
import Cookies from 'js-cookie'
import {Navigate, useLocation} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiExternalLinkFill} from 'react-icons/ri'
import {useNavigate} from 'react-router-dom'

import './index.css'
import Header from '../Header'
// import SimilarProductItem from '../SimilarProductItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    itemData: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {det} = this.props
    

    console.log(det)
    
    
    

    const apiUrl = `https://apis.ccbp.in/jobs/${det}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedItemData = await data.job_details

      const updatedfetchedItemData = {
        companyLogoUrl: fetchedItemData.company_logo_url,
        title: fetchedItemData.title,
        id: fetchedItemData.id,
        companywebsiteUrl: fetchedItemData.company_website_url,
        employmentType: fetchedItemData.employment_type,
        jobDescription: fetchedItemData.job_description,
        skills: fetchedItemData.skills,
        lifeatCompany: fetchedItemData.life_at_company,
        location: fetchedItemData.location,
        packageperAnnum: fetchedItemData.package_per_annum,
        rating: fetchedItemData.rating,
      }

      const updatedSkills = updatedfetchedItemData.skills.map(e => ({
        imgUrl: e.image_url,
        name: e.name,
      }))

      const updatedLife = {
        description: updatedfetchedItemData.lifeatCompany.description,
        iUrl: updatedfetchedItemData.lifeatCompany.image_url,
      }

      updatedfetchedItemData.skills = updatedSkills
      updatedfetchedItemData.lifeatCompany = updatedLife

      const fetchedsimilarjobsdata = await data.similar_jobs

      const updatedsimilarjobsdata = fetchedsimilarjobsdata.map(sm => ({
        smcompanyLogoUrl: sm.company_logo_url,
        smtitle: sm.title,
        smid: sm.id,
        smemploymentType: sm.employment_type,
        smjobDescription: sm.job_description,
        smlocation: sm.location,
        smrating: sm.rating,
      }))

      this.setState({
        itemData: updatedfetchedItemData,
        similarJobs: updatedsimilarjobsdata,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickBt = () => {
    return <Navigate to="/jobs" />
  }

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="nojobs-i-s"
        alt="failure view"
      />
      <h1 className="nojobs-h-s">Oops! Something Went Wrong</h1>
      <p className="nojobs-p-s">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry" onClick={this.getJobItemDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots color="#ffffff" height={50} width={50} />
    </div>
  );

  renderEachSkill = (s, index) => {
    const {imgUrl, name} = s

    return (
      <div className="pj-s-li-cont" key={index}>
        <img src={imgUrl} className="pj-li-i-s" alt={name} />
        <p className="pj-li-p-s">{name}</p>
      </div>
    )
  }

  rendersmjobs = sm => {
    const {
      smid,
      smcompanyLogoUrl,
      smemploymentType,
      smjobDescription,
      smtitle,
      smrating,
      smlocation,
    } = sm

    return (
      <li className="pj-sm-li-cont" key={smid}>
        <div className="t-cont">
          <img
            src={smcompanyLogoUrl}
            className="logo-s"
            alt="similar job company logo"
          />
          <div className="t-in-cont">
            <h1 className="title-s">{smtitle}</h1>
            <div className="rate-cont">
              <FaStar className="star-s" />
              <p className="rate-s">{smrating}</p>
            </div>
          </div>
        </div>

        <h1 className="des-h-s">Description</h1>
        <p className="des-p-s">{smjobDescription}</p>

        <div className="mid-cont">
          <div className="m-l-cont">
            <div className="loc-cont">
              <MdLocationOn className="l-i-s" />
              <p className="l-s">{smlocation}</p>
            </div>
            <div className="loc-cont">
              <BsBriefcaseFill className="l-i-s" />
              <p className="l-s">{smemploymentType}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }

  renderJobItem = () => {
    const {itemData, similarJobs} = this.state
    console.log(similarJobs)
    const {
      title,
      companyLogoUrl,
      companywebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeatCompany,
      location,
      packageperAnnum,
      rating,
    } = itemData

    const {description, iUrl} = lifeatCompany

    return (
      <>
      <Header />
      <div className="pj-cont">
        <div className="pj-each-job-cont">
          <div className="pj-t-cont">
            <img src={companyLogoUrl} className="pj-logo-s" alt="company logo url" />
            <div className="pj-t-in-cont">
              <h1 className="pj-title-s">{title}</h1>
              <div className="pj-rate-cont">
                <FaStar className="pj-star-s" />
                <h1 className="pj-rate-s">{rating}</h1>
              </div>
            </div>
          </div>

          <div className="pj-mid-cont">
            <div className="pj-m-l-cont">
              <div className="pj-loc-cont">
                <MdLocationOn className="pj-l-i-s" />
                <p className="pj-l-s">{location}</p>
              </div>
              <div className="pj-loc-cont">
                <BsBriefcaseFill className="pj-l-i-s" />
                <p className="pj-l-s">{employmentType}</p>
              </div>
            </div>

            <p className="pj-pac-s">{packageperAnnum}</p>
          </div>

          <hr className="pj-hrj-s" />
          <div className="pj-desandlink-cont">
            <h1 className="pj-des-h-s">Description</h1>
            <a href={companywebsiteUrl} className="pj-a-s">
              Visit <RiExternalLinkFill className="pj-a-i-s" />
            </a>
          </div>
          <p className="pj-des-p-s">{jobDescription}</p>
          <h1 className="pj-des-h-s">Skills</h1>
          <div className="pj-skills-ul-cont">
            {skills.map((s, index) => this.renderEachSkill(s, index))}
          </div>
          <h1 className="pj-des-h-s">Life at Company</h1>
          <div className="pj-life-cont">
            <p className="pj-des-p-s">{description}</p>
            <img src={iUrl} className="pj-life-i-s" alt="company img" />
          </div>
        </div>

        <div className="pj-similarJobs-cont">
          <h1 className="pj-smj-h-s">Similar Jobs</h1>
          <ul className="pj-sm-ul-cont">
            {similarJobs.map(sj => this.rendersmjobs(sj))}
          </ul>
        </div>
      </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

const JobItemDetailsRouteWithNavigate = (props) => {
    const navigate = useNavigate()
    const location= useLocation()
    const path=location.pathname
    const parts = path.split('/');
    const id=parts.length > 2 ? parts[2] : null;
    return <JobItemDetailsRoute det={id} navigate={navigate} />
  }
  

export default JobItemDetailsRouteWithNavigate
















