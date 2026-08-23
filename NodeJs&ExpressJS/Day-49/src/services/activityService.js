import appEvents from "../events/appEvents.js";


// USER_REGISTERED
appEvents.on(
  "USER_REGISTERED",
  (user) => {
    console.log(
      `📊 Activity: ${user.name} registered`
    );
  }
);


// USER_LOGIN
appEvents.on(
  "USER_LOGIN",
  (user) => {
    console.log(
      `📊 Activity: ${user.name} logged in`
    );
  }
);


// USER_LOGOUT
appEvents.on(
  "USER_LOGOUT",
  (user) => {
    console.log(
      `📊 Activity: ${user.name} logged out`
    );
  }
);


// PASSWORD_CHANGED
appEvents.on(
  "PASSWORD_CHANGED",
  (user) => {
    console.log(
      `📊 Activity: ${user.name} changed their password`
    );
  }
);