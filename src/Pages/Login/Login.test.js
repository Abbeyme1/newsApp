import { createMemoryHistory } from "@remix-run/router";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { __esModule } from "@testing-library/user-event";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { UserContext, UsersContext } from "../../helper/Context";
import SignUp from "../SignUp";
import Login from "./Login";

// const mockUser = {
//   user: null,
//   setUser: jest.fn(),
// };

// jest.mock("../../helper/context", () => ({
//   __esModule: true,
//   default: React.createContext(),
// }));

var users = {};
var user = {};
const setUsers = (newUsers) => {
  users = newUsers;
};

const setUser = (newUser) => {
  user = newUser;
};

const MockLogin = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/signup" element={<div> SIGNUP </div>} />
      </Routes>
      <UserContext.Provider value={[user, setUser]}>
        <UsersContext.Provider value={[users, setUsers]}>
          <Login />
        </UsersContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

beforeEach(() => {
  setUser({});
  setUsers({});
  localStorage.clear();
});

const MockSignup = () => {
  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <UsersContext.Provider value={[users, setUsers]}>
          <SignUp />
        </UsersContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

it("email should render", () => {
  render(<MockLogin />);
  const email = screen.getByPlaceholderText(/email/i);
  expect(email).toBeInTheDocument();
});

it("password should render", () => {
  render(<MockLogin />);
  const password = screen.getByPlaceholderText(/password/i);
  expect(password).toBeInTheDocument();
});

it("error should not be rendered", () => {
  render(<MockLogin />);
  const error = screen.queryByTestId("error");
  expect(error).not.toBeInTheDocument();
});

it("register link should render", () => {
  render(<MockLogin />);
  const registerLink = screen.getByText(/don't have an account/i);
  expect(registerLink).toBeInTheDocument();
});

it("button should render", () => {
  render(<MockLogin />);
  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Login");
});

it("button should be disabled when input is empty", () => {
  render(<MockLogin />);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

it("email input should be empty", () => {
  render(<MockLogin />);
  const email = screen.getByPlaceholderText(/email/i);
  expect(email.value).toBe("");
});

it("password input should be empty", () => {
  render(<MockLogin />);
  const password = screen.getByPlaceholderText(/password/i);
  expect(password.value).toBe("");
});

it("email is required", () => {
  render(<MockLogin />);
  const email = screen.getByPlaceholderText(/email/i);
  expect(email).toBeRequired();
});

it("password is required", () => {
  render(<MockLogin />);
  const password = screen.getByPlaceholderText(/password/i);
  expect(password).toBeRequired();
});

it("email input should change", () => {
  render(<MockLogin />);
  const input = "a@a.com";
  const email = screen.getByPlaceholderText(/email/i);
  fireEvent.change(email, { target: { value: input } });
  expect(email.value).toBe(input);
});

it("password input should change", () => {
  render(<MockLogin />);
  const input = "*****";
  const password = screen.getByPlaceholderText(/password/i);
  fireEvent.change(password, { target: { value: input } });
  expect(password.value).toBe(input);
});

it("button shoudn't be disabled when input exists", () => {
  render(<MockLogin />);
  const emailInput = "a@a.com";
  const passInput = "*****";
  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button");
  fireEvent.change(email, { target: { value: emailInput } });
  fireEvent.change(password, { target: { value: passInput } });

  expect(button).not.toBeDisabled();
});

it("logged in successfully", () => {
  const emailInput = "test@test.com";
  const passInput = "*****";
  // create a new user
  users = {
    "test@test.com": {
      name: "test",
      email: emailInput,
      password: passInput,
      admin: false,
    },
  };
  // login
  render(<MockLogin />);
  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button");
  fireEvent.change(email, { target: { value: emailInput } });
  fireEvent.change(password, { target: { value: passInput } });
  fireEvent.click(button);

  // //localstorage user != nul
  let user = JSON.parse(localStorage.getItem("user"));
  expect(user).not.toBeNull();
  expect(user.email).toBe(emailInput);
});

it("wrong credentials", () => {
  const emailInput = "test@test.com";
  const passInput = "*****";

  // create a new user
  users = {
    "test@test.com": {
      name: "test",
      email: emailInput,
      password: passInput,
      admin: false,
    },
  };
  // login
  render(<MockLogin />);
  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button");
  fireEvent.change(email, { target: { value: emailInput } });
  fireEvent.change(password, { target: { value: "asdf" } });
  fireEvent.click(button);

  //localstorage user === nul
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("USER", user);
  expect(user).toBeNull();
});

it("error rendered on wrong credentials", () => {
  const emailInput = "test@test.com";
  const passInput = "*****";

  // create a new user
  users = {
    "test@test.com": {
      name: "test",
      email: emailInput,
      password: passInput,
      admin: false,
    },
  };
  // login
  render(<MockLogin />);
  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button");
  fireEvent.change(email, { target: { value: emailInput } });
  fireEvent.change(password, { target: { value: "asdf" } });
  fireEvent.click(button);

  let error = screen.getByTestId("error");
  expect(error.textContent).toContain("Try again");
});

it("register link should work", () => {
  render(<MockLogin />);
  const registerLink = screen.getByText(/don't have an account/i);
  fireEvent.click(registerLink);
  const renderedSignUpPage = screen.getByText("SIGNUP");
  expect(renderedSignUpPage).toBeInTheDocument();
  // expect(register).toBeInTheDocument();
});
