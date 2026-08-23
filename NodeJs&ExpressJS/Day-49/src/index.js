import appEvents from "./events/appEvents.js";

// Register event listeners
import "./services/emailService.js";
import "./services/notificationService.js";
import "./services/activityService.js";


const user = {
  id: 1,
  name: "Satyam",
  email: "satyam@example.com"
};


console.log("\n🚀 Event-Driven Notification System\n");


// USER REGISTERED
console.log("👤 User Registration");

appEvents.emit(
  "USER_REGISTERED",
  user
);


// USER LOGIN
console.log("\n🔐 User Login");

appEvents.emit(
  "USER_LOGIN",
  user
);


// PASSWORD CHANGED
console.log("\n🔑 Password Changed");

appEvents.emit(
  "PASSWORD_CHANGED",
  user
);


// USER LOGOUT
console.log("\n🚪 User Logout");

appEvents.emit(
  "USER_LOGOUT",
  user
);