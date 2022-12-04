import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';

const SocialSignIn = () => {

    const handleSocialSignIn = async (provider) => {
        try{
            await doSocialSignIn(provider);
        }catch(error){
            alert(error);
        }
    }


    return(
        <button>
            <img src="/imgs/google_signin.png" alt="google sign-in" onClick={() => handleSocialSignIn('google')} />
        </button>
    )
};

export default SocialSignIn;
