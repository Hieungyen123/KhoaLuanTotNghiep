import { GoogleLogout } from '@leecheuk/react-google-login'

const ClientId = "699156329111-0iusrci8mnnaerihlmh83o2l7701dvn6.apps.googleusercontent.com"

const logout = (response) => {
    console.log(response);
    console.log('logout rồi')


}
const LogoutGoogle = () => {
    return (
        <div>
            <GoogleLogout
                clientId={ClientId}
                buttonText="Logout"
                // onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                onLogoutSuccess={logout}

                cookiePolicy={'single_host_origin'}
            ></GoogleLogout>
        </div>
    )
}

export default LogoutGoogle
