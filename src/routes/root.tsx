import { Link, Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

export function RootRoute() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <div className="flex flex-col min-h-screen">
        <SiteNavigation />

        <main className="flex-[1]">
          <Outlet />
        </main>

        <SiteFooter />
      </div>
    </CookiesProvider>
  );
}

function SiteNavigation() {
  return (
    <nav className="flex justify-center py-5 px-5 sm:px-10">
      <div className="flex gap-10 items-center">
        <ul className="inline-flex gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>

        <div>
          <h1 className="text-2xl font-bold">Amazing Safari</h1>
        </div>

        <ul className="inline-flex gap-5">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/me">Me</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="p-5 sm:p-10 bg-accent flex justify-center">
      <p className="text-sm text-accent-foreground">
        {year} &copy; Amazing Safari
      </p>
    </footer>
  );
}
