import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "~/models";

function setupJwtStrategy() {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = User.findByPk(payload.sub);
          done(null, user);
        } catch (e) {
          done(e, false);
        }
      }
    )
  );
}

export default function (app) {
  app.use(passport.initialize());
  setupJwtStrategy();
}
