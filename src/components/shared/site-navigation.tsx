import { Link } from "react-router-dom";

import { User } from "@/types";
import { getAvatarURL } from "@/libs/avatar";

interface SiteNavigationProps {
  isAuthenticated?: boolean;
  user?: User | null;
}

export function SiteNavigation({ isAuthenticated, user }: SiteNavigationProps) {
  return (
    <nav className="flex justify-center">
      <div className="w-full max-w-7xl p-4 sm:px-10 flex flex-wrap justify-center items-center gap-4 sm:gap-8 border-b border-border">
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold">🐾 Amazing Safari</h1>
          </Link>
        </div>

        <ul className="inline-flex gap-4 items-center">
          <li>
            <Link to="/products">Products</Link>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}

          {isAuthenticated && user && (
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <img
                    src={getAvatarURL(user.username)}
                    alt={user.id}
                    className="size-8 rounded-full"
                  />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
