import { useState } from "react";
import { useSignupUserMutation } from "../../store/apiSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Signup() {
  const mode = useSelector((s) => s.theme.mode);
  const logoTheme =
    mode === "dark"
      ? "/images/logo-dark-theme.svg"
      : "/images/logo-light-theme.svg";

  const [signupUser] = useSignupUserMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const res = await signupUser(formData);
    if (res.error) {
      setErrorMsg(res.error.data?.message || "Signup failed");
    } else {
      setErrorMsg("");
      e.target.reset();
      navigate("/auth");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="signup"
      className={`flex flex-col rounded-md mx-4 px-5 py-5 my-5 w-full sm:w-[448px] ${
        mode === "light"
          ? "bg-neutral-0 border border-transparent" // CHANGED
          : "bg-neutral-dark-500/25 border border-teal-700"
      }`}
    >
      <img className="mb-6 w-[214px] h-8" src={logoTheme} alt="Logo Theme" />

      <h3
        className={`text-preset1 font-bold ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Create your account!!!!
      </h3>

      <p
        className={`text-preset4 mt-2 font-medium ${
          mode === "light" ? "text-neutral-800" : "text-neutral-dark-100" // CHANGED
        }`}
      >
        Join us and start saving your favorite links — organized, searchable,
        and always within reach.
      </p>

      <label
        className={`text-preset4 font-bold mt-6 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Full name *
      </label>
      <input
        type="text"
        name="fullname"
        className={`px-2 h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500" // CHANGED
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />
      {errorMsg && <p className="text-red-600 text-preset4m mt-2">{errorMsg}</p>}

      <label
        className={`text-preset4 font-bold mt-6 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Email address *
      </label>
      <input
        type="email"
        name="email"
        className={`px-2 h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500" // CHANGED
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />
      {errorMsg && <p className="text-red-600 text-preset4m mt-2">{errorMsg}</p>}

      <label
        className={`text-preset4 font-bold mt-6 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Password *
      </label>
      <input
        type="password"
        name="password"
        className={`px-2 h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500" // CHANGED
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />
      {errorMsg && <p className="text-red-600 text-preset4m mt-2">{errorMsg}</p>}

      <button className="mt-5 mb-4 text-neutral-0 bg-teal-700 h-[46px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#A9A9A9]">
        Create account
      </button>

      <span
        className={`text-center text-preset4m ${
          mode === "light" ? "text-neutral-800" : "text-neutral-dark-100" // CHANGED
        }`}
      >
        Already have an account? &nbsp;
        <button
          type="button"
          className={`text-preset4 font-medium focus:outline-none focus:rounded-md focus:py-1 focus:px-[2px] focus:ring-[2px] focus:ring-[#A9A9A9] ${
            mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
          }`}
          onClick={() => {
            navigate("/auth");
          }}
        >
          Login
        </button>
      </span>
    </form>
  );
}