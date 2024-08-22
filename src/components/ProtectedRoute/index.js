import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookie.get('jwt_token');
  return token !== undefined ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;