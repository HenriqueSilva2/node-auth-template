import passport from "passport";

export default async function (req, res, next) {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (user) {
      req.user = await user;
    }
    next();
  })(req, res, next);
}
