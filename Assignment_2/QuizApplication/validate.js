let name = "";
let username = "";
let password = "";

function setUserName(str){
    username = str;
}
function setName(str){
    name = str
}
function setPassword(str){
    password = str
}

function submitRegister(){
    createUser(name, username, password);
}

function createUser(name, username, password){
    const users = getUsers();
    const randomNumber = generateRandom();
    if(isUserNamePresent(username)){
        alert("User already exists")
        return;
    }
    const newUser = {
        name : name,
        username : username,
        password : password,
        participatedQuiz :[]
    }
    addUser(newUser);
    window.location.href = "/index.html"
}
function login() {
   if(validateUser(username,password)){
    window.location.href = '/index.html'
   }else {
    alert("Username or password not found")
   }
}
function isUserNamePresent(username){
    const usersList = getUsers();
    if(!usersList?.length){
        return false;
    }
    return usersList?.find((user)=>user.username === username);
}
function validateUser(username, password) {
    const usersList = getUsers();
    if(!usersList?.length){
        return false;
    }
    return usersList?.find((user)=>user.username === username && user.password === password);
}
function getUsers(){
    return JSON.parse(localStorage.getItem("users"));
}
function addUser(user){
    const usersListData = localStorage.getItem("users");
    let userList  = JSON.parse(usersListData);
    if(!userList){
        userList = []
    }
    userList.push(user);
    setUser(JSON.stringify(userList));
}
function setUser(data) {
    localStorage.setItem("users", data);
}
function generateRandom(){
    return Math.floor(Math.random()*100);
}