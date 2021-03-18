// AXIOS Hack or Snooze Example 

// https://hackorsnoozev3.docs.apiary.io/#introduction/authentication 

// Hack or Snooze API 
// - Stories (endpoint with no Authentication) -> https://hack-or-snooze-v3.herokuapp.com/stories 
// - Create Storiy (needs authentication) -> POST request to  /stories 
// - Create User (needs authentication) -> POST request to  /users

// Get List of Users 
// - URL -> https://hack-or-snooze-v3.herokuapp.com/users

// async function
async function getUsers() {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/users'); 
    console.log(res); 
}
// getUsers(); // status 401 (unauthorized, need credentials) 

// Signup First... 
// - URL -> https://hack-or-snooze-v3.herokuapp.com/signup 
// - POST name, username, password as body 

// async function
// async function signUp(username, password, name) {
//     // include username, password, name as parameters
//     const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/signup', { user: { name, username, password }}); 
//     console.log(res); 
// }; 
// // getUsers()
// signUp('butters', 'wasabi', 'Butters'); // 409 (conflict) error 

/* code now works; looks like I was repeating the signup details over an over. Just tried on DevTools and did work */ 
async function signup() {
    const response = axios({
        url: "https://hack-or-snooze-v3.herokuapp.com/signup",
        method: "POST",
        data: { "user": { "username": "dbae", "password":"Test@1234", "name": "Danny" } },
      });
}
signup()


// async function 
async function login(username, password) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/login', { user: { username, password } }); 
    console.log(res); 
    return res.data.token; 
}
login('butterschicken', 'wasabi'); 

// async function getUsers(token)
async function getUsers(token) {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/users', {params: {token}}); 
    console.log(res); 
}
getUsers(); 

// async function 
async function getUsersWithAuthorization() {
    const token = await login('butterschicken', 'wasabi'); 
    // console.log(token); 
    getUsers(token); 
}
getUsersWithAuthorization(token); 

// Example - Create new story 
// async function
async function createStory() {
    const token = await login('butterschicken', 'wasabi'); 
    const newStory = {
        token, 
        story: {
            author: 'Butters', 
            title: 'Bock Bock Bock', 
            url: 'http://chickens4lyfe.com' 
        }
    }
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/stories', newStory); 
    console.log(res); 
}
createStory(); 