const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // If no token is found, return 401 Unauthorized
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACESSTOKEN_SECRET, (err, user) => {
        if (err) {
            // If token is expired or invalid, send a 401 response
            if (err.name === "TokenExpiredError") {
                return res.status(401).send("Token expired");
            } else {
                return res.status(401).send("Invalid token");
            }
        }

        // Attach user to request object
        req.user = user;
        console.log("Authenticated user:", user); // Log the decoded user information

        // Proceed to the next middleware or route handler
        next();
    });
}

module.exports = {
    authenticateToken,
};
