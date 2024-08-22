import './index.css'
import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const Eachjob = props => {
  const {det} = props
  const {
    id,
    title,
    location,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
  } = det

  return (
    <Link to={`/jobs/${id}`} className="link-s">
      <li className="each-job-cont">
        <div className="t-cont">
          <img src={companyLogoUrl} className="logo-s" alt="company logo" />
          <div className="t-in-cont">
            <h1 className="title-s">{title}</h1>
            <div className="rate-cont">
              <FaStar className="star-s" />
              <h1 className="rate-s">{rating}</h1>
            </div>
          </div>
        </div>

        <div className="mid-cont">
          <div className="m-l-cont">
            <div className="loc-cont">
              <MdLocationOn className="l-i-s" />
              <p className="l-s">{location}</p>
            </div>
            <div className="loc-cont">
              <BsBriefcaseFill className="l-i-s" />
              <p className="l-s">{employmentType}</p>
            </div>
          </div>

          <p className="pac-s">{packagePerAnnum}</p>
        </div>

        <hr className="hrj-s" />

        <h1 className="des-h-s">Description</h1>
        <p className="des-p-s">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default Eachjob