//! CommonJS Module

// const getUser = require('./services/userService');
// const {Add, Sub, Multiply} = require('./utils/math')


//! ES Modules

// import getUser from './services/userService.js'
// import {Add, Sub, Multiply} from './utils/math.js';

// console.log(getUser(1));
// console.log(Add(2,4))
// console.log(Sub(2,4))
// console.log(Multiply(2,4))


//! Module Caching

import './config/config.js'
import './services/userService.js'

console.log("Main file loaded");