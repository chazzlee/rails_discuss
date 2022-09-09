import { Link } from "@inertiajs/inertia-react";
import React, { type ReactNode } from "react";
import { Inertia } from "@inertiajs/inertia";

type MainLayoutProps = {
  children: ReactNode;
};

const _token = document.getElementsByTagName("meta")[2].getAttribute("content");
export function MainLayout({ children }: MainLayoutProps) {
  // TODO:
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/auth/sign_up">Sign Up</a>
            </li>
            <li>
              <a href="/auth/sign_in">Sign In</a>
            </li>
            <li>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  Inertia.delete("/auth/sign_out", {
                    data: { authenticity_token: _token },
                  });
                }}
              >
                <button type="submit">Logout</button>
              </form>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
