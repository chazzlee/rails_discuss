import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { MainLayout } from "../../components/MainLayout";

type RegistrationProps = {
  registration_path: string;
  _token: string;
};

export default function Registration({
  _token,
  registration_path,
}: RegistrationProps) {
  const [username, setUsername] = useState("deviseuser");
  const [email, setEmail] = useState("deviseuser@test.com");
  const [password, setPassword] = useState("password");
  const [passwordConfirmation, setPasswordConfirmation] = useState("password");

  return (
    <MainLayout>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const credentials = {
            username,
            email,
            password,
            password_confirmation: passwordConfirmation,
            authenticity_token: _token,
          };
          Inertia.post(registration_path, credentials);
        }}
      >
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="password_confirmation">password confirmation:</label>
          <input
            type="password"
            id="password_confirmation"
            placeholder="confirm your password"
            name="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </MainLayout>
  );
}
