import { createMemoryHistory } from "@remix-run/router";
import { fireEvent, render, screen } from "@testing-library/react";
import { __esModule } from "@testing-library/user-event";
import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { UserContext, UsersContext } from "../helper/Context";
import SignUp from "./SignUp";

var users = {};
var user = {};
const setUsers = (newUsers) => {
  users = newUsers;
};

const setUser = (newUser) => {
  user = newUser;
};

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

it("name should render", () => {
  render(<MockSignup />);
  const name = screen.getByPlaceholderText(/name/i);
  expect(name).toBeInTheDocument();
});

it("email should render", () => {
  render(<MockSignup />);
  const email = screen.getByPlaceholderText(/email/i);
  expect(email).toBeInTheDocument();
});

it("password should render", () => {
  render(<MockSignup />);
  const password = screen.getByPlaceholderText(/password/i);
  expect(password).toBeInTheDocument();
});

it("error should not be rendered", () => {
  render(<MockSignup />);
  const error = screen.queryByTestId("error");
  expect(error).not.toBeInTheDocument();
});

it("register link should render", () => {
  render(<MockSignup />);
  const registerLink = screen.getByText(/Already have an account/i);
  expect(registerLink).toBeInTheDocument();
});

it("button should render", () => {
  render(<MockSignup />);
  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Register");
});

it("button should be disabled when input is empty", () => {
  render(<MockSignup />);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

it("name input should be empty", () => {
  render(<MockSignup />);
  const name = screen.getByPlaceholderText(/name/i);
  expect(name.value).toBe("");
});

it("email input should be empty", () => {
  render(<MockSignup />);
  const email = screen.getByPlaceholderText(/email/i);
  expect(email.value).toBe("");
});

it("password input should be empty", () => {
  render(<MockSignup />);
  const password = screen.getByPlaceholderText(/password/i);
  expect(password.value).toBe("");
});

it("name is required", () => {
  render(<MockSignup />);
  const name = screen.getByPlaceholderText(/name/i);
  expect(name).toBeRequired();
});

it("email is required", () => {
  render(<MockSignup />);
  const email = screen.getByPlaceholderText(/email/i);
  expect(email).toBeRequired();
});

it("password is required", () => {
  render(<MockSignup />);
  const password = screen.getByPlaceholderText(/password/i);
  expect(password).toBeRequired();
});

it("email input should change", () => {
  render(<MockSignup />);
  const input = "Abhay";
  const name = screen.getByPlaceholderText(/name/i);
  fireEvent.change(name, { target: { value: input } });
  expect(name.value).toBe(input);
});

it("email input should change", () => {
  render(<MockSignup />);
  const input = "a@a.com";
  const email = screen.getByPlaceholderText(/email/i);
  fireEvent.change(email, { target: { value: input } });
  expect(email.value).toBe(input);
});

it("password input should change", () => {
  render(<MockSignup />);
  const input = "*****";
  const password = screen.getByPlaceholderText(/password/i);
  fireEvent.change(password, { target: { value: input } });
  expect(password.value).toBe(input);
});

it("button shoudn't be disabled when input exists", () => {
  render(<MockSignup />);
  const nameInput = "abhay";
  const emailInput = "a@a.com";
  const passInput = "*****";
  const name = screen.getByPlaceholderText(/name/i);
  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button");
  fireEvent.change(name, { target: { value: nameInput } });
  fireEvent.change(email, { target: { value: emailInput } });
  fireEvent.change(password, { target: { value: passInput } });

  expect(button).not.toBeDisabled();
});

const register = (nameInput, emailInput, passInput) => {
  const name = screen.getByPlaceholderText(/name/i);
  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button");
  fireEvent.change(name, { target: { value: nameInput } });
  fireEvent.change(email, { target: { value: emailInput } });
  fireEvent.change(password, { target: { value: passInput } });
  fireEvent.click(button);
};
it("register a new user", () => {
  render(<MockSignup />);
  const nameInput = "test";
  const emailInput = "test@test.com";
  const passInput = "test";
  register(nameInput, emailInput, passInput);

  let user = JSON.parse(localStorage.getItem("users"))[emailInput];
  expect(user.name).toBe(nameInput);
  expect(user.email).toBe(emailInput);
  expect(user.password).toBe(passInput);
  expect(user.admin).toBe(false);
});

it("user already exists", () => {
  render(<MockSignup />);
  const nameInput = "test";
  const emailInput = "test@test.com";
  const passInput = "test";
  register(nameInput, emailInput, passInput);
  register(nameInput, emailInput, passInput);

  let users = JSON.parse(localStorage.getItem("users"));
  expect(Object.keys(users).length).toBe(1);
});

it("render error when email exists", () => {
  render(<MockSignup />);
  const nameInput = "test";
  const emailInput = "test@test.com";
  const passInput = "test";
  register(nameInput, emailInput, passInput);
  register(nameInput, emailInput, passInput);

  let error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
});

it.todo(
  "login link should work",
  // () => {
  // const history = createMemoryHistory();
  // render(
  //   <Router history={history}>
  //     <Route path="/signup" element={<SignUp />}>
  //       <MockLogin />
  //     </Route>
  //   </Router>,
  // );
  // const registerLink = screen.getByText(/don't have an account/i);
  // let a = fireEvent.click(registerLink);
  // console.log(a);
  // expect(register).toBeInTheDocument();
  // }
);
