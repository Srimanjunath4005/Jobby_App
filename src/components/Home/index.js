import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = () => (
  <>
    <div className="home-bg-cont">
      <Header />
      <div className="home-cont">
        <h1 className="home-h-style">Find The Job That Fits Your Life</h1>
        <p className="home-p-style">
          Millions of people are searching for jobs, salary information, company
          reviews.Find the jobs that fits your abilities and potential.
        </p>
        <Link className="home-link-style" to="/jobs">
          <button className="home-bt-style">Find Jobs</button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
