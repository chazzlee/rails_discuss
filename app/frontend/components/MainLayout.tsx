import React, { type ReactNode } from "react";
import { Inertia } from "@inertiajs/inertia";
import type { User } from "../types";
import { usePage } from "@inertiajs/inertia-react";

type MainLayoutProps = {
  children: ReactNode;
};

// TODO: move to function later
const _token = document.getElementsByTagName("meta")[2].getAttribute("content");
export function MainLayout({ children }: MainLayoutProps) {
  const { current_user } = usePage().props;

  return (
    <div>
      <header>
        <nav>
          <ul>
            {!current_user ? (
              <>
                <li>
                  <h3>Hello Guest</h3>
                </li>
                <li>
                  <a href="/auth/sign_up">Sign Up</a>
                </li>
                <li>
                  <a href="/auth/sign_in">Sign In</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <h3>Hello {(current_user as User).username}</h3>
                </li>
                <li>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      Inertia.delete("/auth/sign_out", {
                        data: { authenticity_token: _token },
                      });
                      window.location.href = "/";
                    }}
                  >
                    <button type="submit">Logout</button>
                  </form>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
