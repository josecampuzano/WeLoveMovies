// used with .all to restrict methods not allowed on specific routes 
function methodNotAllowed(req, res, next) {
    next({
        status: 405,
        message: `${req.method} not allowed for ${req.originalUrl}`,
    });
}

module.exports = methodNotAllowed;
