import { type ParentComponent, Switch, Match } from "solid-js";
import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authenticator } from "~/server/auth";
import { authClient } from "~/utils/auth";

export const routeData = () => {
  return createServerData$(async (_, { request }) => {
    const user = await authenticator.isAuthenticated(request);
    return user;
  });
};

const Home: ParentComponent = () => {
  const res = useRouteData<typeof routeData>();

  return (
    <>
      <Title>Home</Title>
      <div>
        <Switch
          fallback={
            <div class="font-bold text-2xl text-gray-500">Loading...</div>
          }
        >
          <Match when={res() !== undefined}>
            <pre class="font-bold text-2xl text-gray-500">
              {JSON.stringify(res(), null, 2)}
            </pre>
          </Match>
        </Switch>
        <Switch
          fallback={
            <button
              onClick={() =>
                authClient.login("google", {
                  successRedirect: "/",
                  failureRedirect: "/",
                })
              }
              class="bg-purple-700 mx-3 my-3 rounded-lg w-56 p-2.5 text-white font-bold flex items-center justify-center"
            >
              Login with google
            </button>
          }
        >
          <Match when={res()}>
            <button
              onClick={() =>
                authClient.logout({
                  redirectTo: "/",
                })
              }
              class="bg-purple-700 mx-3 my-3 rounded-lg w-56 p-2.5 text-white font-bold flex items-center justify-center"
            >
              Logout
            </button>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Home;
