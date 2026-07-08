//! if else statement

let marks = 70;

if (marks < 30) {
    console.log("Fail!!");
} else if (marks < 50) {
    console.log("okk");
} else if (marks < 80) {
    console.log("Very good")
} else {
    console.log("That's great!!")
}

(marks < 30) ? console.log("Fail!!") : (marks < 50) ? console.log("okk") : (marks < 80) ? console.log("Very good") : console.log("That's great!!")

switch (true) {
    case (marks < 30):
        console.log("Fail!!")
        break;
    case (marks < 50):
        console.log("ok")
        break;
    case (marks < 80):
        console.log("Very good")
        break;

    default:
        console.log("That's great!!")
        break;
}