//! CommonJS Module

// const getUser = (id) => {
//     return{
//         id, name: "Satyam Kumar"
//     }
// }

// module.exports = getUser;



//! ES Modules

// const getUser = (id) => {
//     return{
//         id, name: "Satyam Kumar"
//     }
// }

// export default getUser;

import { value } from '../utils/math.js'

console.log("User service loaded: ", value);