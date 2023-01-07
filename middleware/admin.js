//middleware  to check whether user is admin, so it can perform a given action

module.exports = function (req, res, next) {
    //401 - Unauuthorized:when they try to access but dont have valid webtoken, there is also a chance to send a valid webtoke
    //403 - Forbidden: when they dont have the permission to access enpoint.Don't try again, you cant accesss it.
    
    if (!req.user.isAdmin) return res.status(403).send('Access denied') // forbidden
    
    next();
}