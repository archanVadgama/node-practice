const jwt = require('jsonwebtoken');
const JWT_SECRET = "Arc@120480";

function setUser(user){
    return jwt.sign(user, JWT_SECRET);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    setUser, getUser
}