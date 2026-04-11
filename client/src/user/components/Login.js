import { useState } from "react";
import { useLoginUserMutation } from "../../store/apiSlice";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/authSlice";

export default function Login() {
  const mode = useSelector((s) => s.theme.mode);
  const logoTheme =
    mode === "dark"
      ? "/images/logo-dark-theme.svg"
      : "/images/logo-light-theme.svg";
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const data = await loginUser(formData).unwrap();
      dispatch(setToken({
        token: data.token,
        fullname: data.fullname,
        email: data.email,
        id: data.id
      }));
      
      setErrorMsg("");
      e.target.reset();

      const from = location.state?.from?.pathname || "/bookmark";
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(
        err?.data?.msg || err?.data?.message || err?.error || "Login Failed"
      );
      console.log("login error:", err);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    navigate("/auth/reset");
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="login"
      className={`flex flex-col rounded-md mx-4 px-5 py-5 my-5 w-full sm:w-[448px] ${
        mode === "light"
          ? "bg-neutral-0 border border-transparent" // CHANGED: remove border/outline look in light
          : "bg-neutral-dark-500/25 border border-teal-700"
      }`}
    >
      <img className="mb-6 w-[214px] h-8" src={logoTheme} alt="Logo Theme" />
      <h3
        className={`text-preset1 font-bold ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0"
        }`}
      >
        Log in to your account
      </h3>
      <p
        className={`text-preset4 mt-2 font-medium ${
          mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
        }`}
      >
        Welcome back! Please enter your details.
      </p>
      <label
        className={`text-preset4 font-bold mt-5 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0"
        }`}
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        className={`h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500"
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />
      {errorMsg && (
        <p className="text-red-600 text-preset4m mt-2">{errorMsg}</p>
      )}
      <label
        className={`text-preset4 font-bold mt-5 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0"
        }`}
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        className={`h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500"
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />
      {errorMsg && (
        <p className="text-red-600 text-preset4m mt-2">{errorMsg}</p>
      )}
      <button
        disabled={isLoading}
        className="mt-5 mb-4 text-neutral-0 bg-teal-700 h-[46px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#A9A9A9]"
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <span
        className={`text-center text-preset4m mb-2 ${
          mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
        }`}
      >
        Forgot password?&nbsp;{" "}
        <button
          className={`text-preset4 font-medium focus:outline-none focus:rounded-md focus:py-1 focus:px-[2px] focus:ring-[2px] focus:ring-[#A9A9A9] ${
            mode === "light" ? "text-neutral-900" : "text-neutral-0"
          }`}
          type="button"
          onClick={handleReset}
        >
          Reset it
        </button>
      </span>
      <span
        className={`text-center text-preset4m ${
          mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
        }`}
      >
        Don’t have an account?&nbsp;{" "}
        <button
          className={`text-preset4 font-medium focus:outline-none focus:rounded-md focus:py-1 focus:px-[2px] focus:ring-[2px] focus:ring-[#A9A9A9] ${
            mode === "light" ? "text-neutral-900" : "text-neutral-0"
          }`}
          type="button"
          onClick={() => {
            navigate("/auth/signup");
          }}
        >
          {" "}
          Sign up
        </button>
      </span>
    </form>
  );
}
