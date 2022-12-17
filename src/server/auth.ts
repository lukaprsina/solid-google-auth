import { Authenticator } from "@solid-auth/core";
import { GoogleStrategy } from "@solid-auth/socials";
import { serverEnv } from "~/env/server";
import { sessionStorage } from "~/utils/auth";

export type User = {
  id: string;
  displayName: string;
  avatar?: string;
};

const users: User[] = [];

export const authenticator = new Authenticator<User>(sessionStorage).use(
  new GoogleStrategy(
    {
      clientID: serverEnv.CLIENT_ID_GOOGLE,
      clientSecret: serverEnv.CLIENT_SECRET_GOOGLE,
      callbackURL: serverEnv.SITE_URL + "/api/auth/google/callback",
      scope: ["email", "openid", "profile"]
    },
    async (user_config) => {
      let user = users.find((u) => u.id === user_config.profile.id);

      console.log(user_config)

      if (!user) {
        user = {
          id: user_config.profile.id,
          displayName: user_config.profile.displayName,
          avatar: user_config.profile.photos[0].value,
        };
        users.push(user);
      }
      return user;
    }
  )
);
