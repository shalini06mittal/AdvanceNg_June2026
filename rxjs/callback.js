function login(un, pwd, callback){


    let isLogin = false;
    setTimeout(() => {
        // HTTP call to validate the user   
        if(un==='a' && pwd === 'a')
            {
                console.log('success');
                isLogin = true;
            }
            callback(isLogin)
    }, 2000);
   // return isLogin;
} 

login('a','a1', (resp => console.log(resp)));
// login('a','a')

// callback hell
