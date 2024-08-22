import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { GiSuitcase } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="nav-cont">
      <div className="mobile-view">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-style"
          />
        </Link>
        <ul className="mobile-list-cont">
          <li>
            <Link to="/" className="link-style">
              <MdHome className="mobile-icon-style" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-style">
              <GiSuitcase className="mobile-icon-style" />
            </Link>
          </li>
          <li>
            <button
              className="mobile-logout-button"
              onClick={onClickLogout}
              title="Logout"
            >
              <FiLogOut className="mobile-icon-style" />
            </button>
          </li>
        </ul>
      </div>

      <div className="pc-view">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-style"
          />
        </Link>

        <ul className="pc-list-cont">
          <li>
            <Link to="/" className="link-style">
              <h1 className="comp-style">Home</h1>
            </Link>
          </li>

          <li>
            <Link to="/jobs" className="link-style">
              <h1 className="comp-style">Jobs</h1>
            </Link>
          </li>
        </ul>

        <button className="logout-style" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
