import loginBgPic from '../../../assets/loginBgPic.jpg';
import s from './index.less';
const LoginBgPic = () => {
    return (
        <div className={s.loginBgPic}>
            <img alt="" src={loginBgPic} className={s.bgImg} />
        </div>
    )
}

export default LoginBgPic;