import LoginBgPic from './LoginBgPic';
import LoginForm from './LoginForm';
import s from './index.less';
export default function Login() {
  return (
    <div className={s.homePage}>
      <LoginBgPic />
      <div className={s.loginContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
