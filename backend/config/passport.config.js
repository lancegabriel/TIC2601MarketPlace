const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require("./db.config");

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: "secret"
}
passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, done) {
    db.query(`SELECT * FROM ACCOUNT WHERE accID = '${jwt_payload.sub}'`, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}));

module.exports = passport;