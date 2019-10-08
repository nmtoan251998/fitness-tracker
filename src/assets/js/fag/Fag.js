import { signin, signup, checkLogIn, changeNavBarWhenLogedIn, logout } from '../utils/Authenticate';

(async () => {
    changeNavBarWhenLogedIn(checkLogIn());

    // add sign in event 
    await signin();

    // add sign up event
    await signup();

    // add log out event
    logout();
})();