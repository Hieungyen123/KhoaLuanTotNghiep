import { GoogleLogin } from '@leecheuk/react-google-login'
import MyContext from '../../contexts/MyContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoginGoogle = () => {
    const ClientId = "699156329111-0iusrci8mnnaerihlmh83o2l7701dvn6.apps.googleusercontent.com"
    const navigate = useNavigate();

    const responseLoginGoogle = (response) => {
        // console.log(response.profileObj, response.tokenId);

        // refreshTokenSetup(response)
        console.log(response)
        const data = {
            email: response.profileObj.email,
            username: response.profileObj.name,
            image: response.profileObj.imageUrl,
            token: response.accessToken
        }
        axios.post('/api/customer/signup-google', data).then((res) => {
            const result = res.data;
            // console.log(result)
            if (result.success === true) {
                console.log(result)
                Context.setToken(result.token);
                localStorage.setItem('accessToken', result.token);
                localStorage.setItem('loginType ', 'google');
                localStorage.setItem('refreshToken', result.refreshtoken);
                Context.setCustomer(result.data);
                navigate('/home');
            } else {
                Context.SetnotifyWarning('Tài khoản,mật khẩu không đúng hoặc bạn chưa active account')
            }
            // alert(result.message)
        });

    }
    const Context = useContext(MyContext);

    return (
        <div>
            <GoogleLogin
                clientId={ClientId}
                buttonText="Login"
                onSuccess={responseLoginGoogle}
                // onFailure={responseLoginGoogle}
                cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
            ></GoogleLogin>
        </div>
    )
}

export default LoginGoogle
