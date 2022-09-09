import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { MainLayout } from "../../components/MainLayout";

type LoginProps = {
  session_path: string;
  _token: string;
};

export default function Login({ session_path, _token }: LoginProps) {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password");

  return (
    <MainLayout>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const credentials = {
            email,
            password,
            authenticity_token: _token,
          };
          Inertia.post(session_path, credentials);
        }}
      >
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </MainLayout>
  );
}
