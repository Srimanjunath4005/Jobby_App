import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie'
import Profile from '../Profile'
import TypeandSalary from '../TypeandSalary'
import Eachjob from '../Eachjob'

import './index.css'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    profileapiStatus: apiStatusConstants.initial,
    jobsapiStatus: apiStatusConstants.initial,
    jobsList: [],
    eType: [],
    salaryRange: [],
  }

  componentDidMount() {
    this.getjobs()
  }

  getjobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput, eType, salaryRange} = this.state
    const eTypestr = eType.join(',')
    const salaryRangestr = salaryRange.join(',')

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${eTypestr}&minimum_package=${salaryRangestr}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.jobs
      const updatedData = fetchedData.map(ej => ({
        companyLogoUrl: ej.company_logo_url,
        id: ej.id,
        employmentType: ej.employment_type,
        jobDescription: ej.job_description,
        location: ej.location,
        packagePerAnnum: ej.package_per_annum,
        rating: ej.rating,
        title: ej.title,
      }))
      this.setState({
        jobsList: updatedData,
        searchInput: '',
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        searchInput: '',
      })
    }
  }

  onEnterInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="nojobs-i-s"
        alt="failure view"
      />
      <h1 className="nojobs-h-s">Oops! Something Went Worng</h1>
      <p className="nojobs-p-s">
        We cannot seem to find the page you are looking for.
      </p>
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

  renderjobs = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list">
        {jobsList.map(e => (
          <Eachjob key={e.id} det={e} />
        ))}
      </ul>
    )
  }

  renderNojobs = () => (
    <div className="nojobs-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        className="nojobs-i-s"
        alt="no jobs"
      />
      <h1 className="nojobs-h-s">No Jobs Found</h1>
      <p className="nojobs-p-s">
        We could not finf any jobs, Try other filters
      </p>
    </div>
  )

  addeType = e => {
    this.setState(
      prevState => ({
        eType: [...prevState.eType, e],
      }),
      this.getjobs,
    )
  }

  removeeType = e => {
    const {eType} = this.state
    const neweType = eType.filter(item => item !== e)
    this.setState({eType: neweType}, this.getjobs)
  }

  addsType = s => {
    this.setState(
      prevState => ({
        salaryRange: [...prevState.salaryRange, s],
      }),
      this.getjobs,
    )
  }

  removesType = s => {
    const {salaryRange} = this.state
    const newRange = salaryRange.filter(item => item !== s)
    this.setState({salaryRange: newRange}, this.getjobs)
  }

  render() {
    const {apiStatus, searchInput, jobsList} = this.state
    return (
      <>
        <Header />
        <div className="jobs-cont">
          <div className="filter-cont">
            <div className="jobs-mobile-search-cont">
              <input
                type="search"
                className="jobs-mobile-input-style"
                placeholder="Search"
                onChange={this.onEnterInput}
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="jobs-mobile-search-button"
                onClick={this.getjobs}
                aria-label="Search"
                title="Search"
              >
                <BsSearch />
              </button>
            </div>
            <Profile />
            <hr className="line-style" />
            <TypeandSalary
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              addeType={this.addeType}
              removeeType={this.removeeType}
              addsType={this.addsType}
              removesType={this.removesType}
            />
          </div>

          <div className="job-res-cont">
            {apiStatus === 'SUCCESS' &&
              jobsList.length === 0 &&
              this.renderNojobs()}
            {apiStatus === 'SUCCESS' &&
              jobsList.length > 0 &&
              this.renderjobs()}
            {apiStatus === 'FAILURE' && this.renderFailureView()}
            {apiStatus === 'IN_PROGRESS' && this.renderLoadingView()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs