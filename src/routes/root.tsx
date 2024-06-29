import { Link, Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

export function RootRoute() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <header>
        <h1>Amazing Safari</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
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
        </nav>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>
    </CookiesProvider>
  );
}
