
import cookie from 'js-cookie'



// Set in Cookie
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        }) 
    }
}


// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};


// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    // console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('jwt', response.data.token);
    setLocalStorage('user', response.data.useremail);
    next();
};

export const saveCartData = (response, next) => {
    // console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  
    setLocalStorage('cart',"sachin");
    next();
};

// const check = () =>{
//        const cookieChecked = getCookie('jwt');
//        console.log("mycookies",cookieChecked);
// }
// check();

// Access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('jwt');
        // console.log("xxxxyy",cookieChecked);
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                console.log("undefined");
                return false;
            }
        }
    }
};

console.log("hello",isAuth());



export const signout = next => {
    removeCookie('jwt');
    removeLocalStorage('user');
    
    next();
};

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    
    }
    next();
};