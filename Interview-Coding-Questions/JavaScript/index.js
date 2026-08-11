/*

* user email masking  : Given mail is: satyambhardwaj59@gmail.com
*  1. During forget password, user see their email like s*********@gamil.com show build this 

*/

const email = 'satyambhardwaj59@gamil.com'

function maskEmail(email){
    const [userMail, domain] = email.split('@');
    return userMail[0]+'*'.repeat(userMail.length - 1)+ '@' + domain;
}

console.log(maskEmail(email));