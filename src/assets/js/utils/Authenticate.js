import axios from 'axios';

const saveAuthData = ({ token, email }) => {
    localStorage.setItem('jwtAuth', token);
    localStorage.setItem('user', email);
}

const deleteAuthData = () => {
    localStorage.removeItem('jwtAuth');
    localStorage.removeItem('user');
}

const getAuthData = () => {
    const token = localStorage.getItem('jwtAuth');
    const email = localStorage.getItem('user');

    return {
        token: token,
        email: email
    }
}

export const checkLogIn = () => {
    const { token, email } = getAuthData();

    if (!token || !email) {
        return false;
    }

    return true;
}

export const changeNavBarWhenLogedIn = (isLogedIn) => {
    if (isLogedIn === false) return;
    
    const { email } = getAuthData();

    $('.unauthenticated').css('display', 'none');
    $('.authenticated').css('display', 'flex');

    $('.signined-user').text(email);
}

export const auth = (isLogedIn) => {
    if (isLogedIn === false) {
        return window.location = '/';
    }
}

export const signin = (email, password) => {
    $('#signin-form-submit-button').on('click', async (event) => {
        event.preventDefault();
        
        const emailVal = email || $('#signin-email').val();
        const passwordVal = password || $('#signin-password').val();

        try {
            const signinResult = await axios({
                method: 'post',
                url: '/auth/signin',
                data: {
                    email: emailVal,
                    password: passwordVal,
                }
            })

            if (signinResult.status === 200) {
                // handle response
                saveAuthData({ token: signinResult.data.token, email: signinResult.data.user.email });
                                
                signin();

                setTimeout(() => {
                    $('#signin-form-container').modal('hide');

                    changeNavBarWhenLogedIn(true);
                }, 1500);                
            }            
        } catch (error) {
            // handle error response
            console.log(error.response);
        }
        
    })    
}

export const signup = () => {    
    $('#signup-form-submit-button').on('click', async (event) => {
        event.preventDefault();

        const emailVal = $('#signup-email').val();
        const passwordVal = $('#signup-password').val();
        const nameVal = $('#signup-name').val();
        const phoneVal = $('#signup-phone').val();
        const ageVal = $('#signup-age').val();
        const genderVal = Array.from($('.signup-gender')).filter(radio => {            
            return radio.checked === true
        })[0].value;

        try {
            const signupResult = await axios({
                method: 'post',
                url: '/auth/signup',
                data: {
                    email: emailVal,
                    password: passwordVal,
                    name: nameVal,
                    phone: phoneVal,
                    age: ageVal,
                    gender: genderVal
                }
            })

            if (signupResult.status === 201) {                
                setTimeout(() => {
                    $('#signup-form-container').modal('hide');

                    setTimeout(() => {
                        $('#signin-form-container').modal('show');
                    }, 500);
                }, 1500);
            }            
        } catch (error) {
            // handle error response
            console.log(error.response);
        }        
        
    })    
}

export const logout = () => {
    $('.logout').on('click', (event) => {
        event.preventDefault();

        deleteAuthData();

        window.location = window.location.pathname;
    });
}