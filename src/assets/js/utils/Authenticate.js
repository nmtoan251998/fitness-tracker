import axios from 'axios';
import HandleResponse from './HandleServerResponse';

const saveAuthData = ({ token, tokenExpiration, email }) => {
    localStorage.setItem('jwtExpiration', tokenExpiration);
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', email);
}

const deleteAuthData = () => {
    localStorage.removeItem('jwtExpiration');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
}

const getAuthData = () => {
    const expiration = localStorage.getItem('jwtExpiration');
    const token = localStorage.getItem('jwt');
    const email = localStorage.getItem('user');

    return {
        tokenExpiration: expiration,
        token: token,
        email: email
    }
}

const reAuth = () => {        
    const { token, tokenExpiration } = getAuthData();
    
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + tokenExpiration;
    now.setTime(expireTime);

    document.cookie = `jwt=${token};expires=${now.toGMTString()};path=/`;
}

export const checkLogIn = () => {
    const { token, email } = getAuthData();  
    
    if (!token || !email) {
        return false;
    }

    reAuth();
    return true;
}


export const changeNavBarWhenLogedIn = (isLogedIn) => {
    if (isLogedIn === false) return;
    
    const { email } = getAuthData();

    $('.unauthenticated').css('display', 'none');
    $('.authenticated').css('display', 'flex');

    $('.signined-user').text(email);
}

export const auth = () => {
    
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
                HandleResponse('.signin-response', signinResult.data.msg, signinResult.status);
                // handle response
                saveAuthData({ 
                    tokenExpiration: signinResult.data.tokenExpiration, 
                    token: signinResult.data.token, 
                    email: signinResult.data.user.email 
                });
                                
                signin();

                setTimeout(() => {
                    $('#signin-form-container').modal('hide');

                    changeNavBarWhenLogedIn(true);
                }, 1500);                
            }
            return;
        } catch (error) {
            if (error.response.data.msg) {
                HandleResponse('.signin-response', error.response.data.msg, error.response.status);    
            } else {
                const errorsData = error.response.data.map(data => data.msg);
                HandleResponse('.signin-response', errorsData, error.response.status);
            }     
        }
        
    })    
}

export const signup = () => {    
    $('#signup-form-submit-button').on('click', async (event) => {
        event.preventDefault();

        const emailVal = $('#signup-email').val() || '';
        const passwordVal = $('#signup-password').val() || '';
        const nameVal = $('#signup-name').val() || '';
        const phoneVal = $('#signup-phone').val() || '';
        const ageVal = $('#signup-age').val() || 0;
        const genderValue = Array.from($('.signup-gender')).filter(radio => {            
            return radio.checked === true
        })[0];

        const genderVal = (genderValue) ? genderValue.value : '';

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
                HandleResponse('.signup-response', signupResult.data.msg, signupResult.status);
                setTimeout(() => {
                    $('#signup-form-container').modal('hide');                                        

                    setTimeout(() => {
                        $('#signin-form-container').modal('show');
                    }, 1500);
                }, 1500);
            }
        } catch (error) {
            if (error.response.data.msg) {
                HandleResponse('.signup-response', error.response.data.msg, error.response.status);    
            } else {
                const errorsData = error.response.data.map(data => data.msg);
                HandleResponse('.signup-response', errorsData, error.response.status);
            }            
        }        
        
    })    
}

export const logout = () => {
    $('.logout').on('click', async (event) => {
        event.preventDefault();

        deleteAuthData();

        await axios.get('/auth/logout');

        window.location = window.location.pathname;
    });
}