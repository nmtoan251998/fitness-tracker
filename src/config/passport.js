const JwtStrategy = require('passport-jwt').Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt;

const { secretKey } = require('../config/vars');
const UserModel = require('../api/models/user.model');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey.value
};

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {        
        try {                        
            const user = await UserModel.findUserById(payload.id);

            if (!user) {
                return done(null, false);
            }
            
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));   
}