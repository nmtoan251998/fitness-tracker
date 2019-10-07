import axios from 'axios';

const authenticate = async () => {

}

const signup = () => {    
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

            // handle response
            console.log(signupResult);
        } catch (error) {
            // handle error response
            console.log(error.response);
        }        
        
    })    
}
signup();

const signin = () => {
    $('#signin-form-submit-button').on('click', async (event) => {
        event.preventDefault();

        const emailVal = $('#signin-email').val();
        const passwordVal = $('#signin-password').val();
    

        try {
            const signinResult = await axios({
                method: 'post',
                url: '/auth/signin',
                data: {
                    email: emailVal,
                    password: passwordVal,
                }
            })

            // handle response
            console.log(signinResult);
        } catch (error) {
            // handle error response
            console.log(error.response);
        }
        
    })    
}
signin();