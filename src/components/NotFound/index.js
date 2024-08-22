import './index.css'
import Header from '../Header'

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="nf-bg-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png "
          alt="not found"
          className="nf-img-style"
        />
        <h1 className="nf-h-style">Page Not Found</h1>
        <p className="nf-p-style">
          we're sorry, the page you requested could not be found
        </p>
      </div>
    </>
  )
}
export default NotFound