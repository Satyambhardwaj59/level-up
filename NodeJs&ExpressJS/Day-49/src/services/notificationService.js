import appEvents from "../events/appEvents.js";


// USER_REGISTERED
appEvents.on(
  "USER_REGISTERED",
  (user) => {
    console.log(
      `🔔 Notification: Welcome ${user.name}!`
    );
  }
);


// USER_LOGIN
appEvents.on(
  "USER_LOGIN",
  (user) => {
    console.log(
      `🔔 Notification: ${user.name} logged in`
    );
  }
);


// USER_LOGOUT
appEvents.on(
  "USER_LOGOUT",
  (user) => {
    console.log(
      `🔔 Notification: ${user.name} logged out`
    );
  }
);


// PASSWORD_CHANGED
appEvents.on(
  "PASSWORD_CHANGED",
  (user) => {
    console.log(
      `🔔 Notification: Password changed successfully for ${user.name}`
    );
  }
);
