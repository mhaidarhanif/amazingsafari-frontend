import { Outlet, useLoaderData } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { SiteNavigation } from "@/components/shared/site-navigation";
import { SiteFooter } from "@/components/shared/site-footer";
import { authProvider } from "@/libs/auth";

export async function loader() {
  if (!authProvider.isAuthenticated) {
    await authProvider.checkUser();
  }

  return {
    isAuthenticated: authProvider.isAuthenticated,
    user: authProvider.user,
  };
}

export function RootRoute() {
  const { isAuthenticated, user } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <div className="flex flex-col min-h-screen">
        <SiteNavigation isAuthenticated={isAuthenticated} user={user} />

        <div className="flex-[1]">
          <Outlet />
        </div>

        <SiteFooter />
      </div>
    </CookiesProvider>
  );
}
