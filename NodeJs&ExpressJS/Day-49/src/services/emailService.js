import appEvents from "../events/appEvents.js";


// user register 
appEvents.on(
    "USER_REGISTERED",
    (user) => {
        console.log(`Email Serviece: Welcome email sent to ${user.email}`);
    }
);


// Password change
appEvents.on(
    "PASSWORD_CHANGED", 
    (user) => {
         console.log(`Email Serviece: Password changed email sent to ${user.email}`);
    }
);

// User Login
appEvents.on(
    "USER_LOGIN", 
    (user) => {
         console.log(`Email Serviece: Login alert sent to ${user.email}`);
    }
);


// User Logout
appEvents.on(
    "USER_LOGOUT", 
    (user) => {
         console.log(`Email Serviece: Logout confirmation sent to ${user.email}`);
    }
);