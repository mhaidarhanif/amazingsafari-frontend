import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavigation } from "@/components/shared/site-navigation";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error: any = useRouteError();

  console.error(error);

  return (
    <div id="error-page" className="flex flex-col min-h-screen">
      <SiteNavigation />

      <div className="flex-[1]">
        <main className="flex justify-center pt-10">
          <div className="space-y-2">
            <h1 className="text-xl font-medium">Error</h1>

            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
