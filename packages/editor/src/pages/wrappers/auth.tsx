import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'umi';

export default () => {
  const isLogin = Cookies.get('isLogin');
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}