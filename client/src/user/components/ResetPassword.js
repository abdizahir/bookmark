import { useState } from "react";
import { useSelector } from "react-redux";
import { useResetPasswordMutation } from "../../store/apiSlice";
import { useNavigate, useSearchParams } from "react-router";

export default function ResetPassword() {
  const mode = useSelector((s) => s.theme.mode);
  const logoTheme =
    mode === "dark"
      ? "/images/logo-dark-theme.svg"
      : "/images/logo-light-theme.svg";

  const [errorMsg, setErrorMsg] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const formData = {
      token,
      newPassword: e.target.newPassword.value,
      confirmNewPassword: e.target.confirmNewPassword.value,
    };
    const res = await resetPassword(formData);
    if (res.error) {
      setErrorMsg(res.error.data?.msg || "Reset Password Failed");
    } else {
      setErrorMsg("");
      e.target.reset();
      navigate("/auth");
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className={`flex flex-col rounded-md mx-4 px-5 py-5 my-6 w-full sm:w-[448px] ${
        mode === "light"
          ? "bg-neutral-0 border border-transparent" // CHANGED
          : "bg-neutral-dark-500/25 border border-teal-700"
      }`}
    >
      <img className="mb-8 w-[214px] h-8" src={logoTheme} alt="Logo Theme" />

      <h3
        className={`text-preset1 font-bold ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Reset Your Password
      </h3>

      <p
        className={`text-preset4 mt-2 font-medium ${
          mode === "light" ? "text-neutral-800" : "text-neutral-dark-100" // CHANGED
        }`}
      >
        Enter your new password below. Make sure it’s strong and secure.
      </p>

      <label
        className={`text-preset4 font-bold mt-8 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        New Password *
      </label>
      <input
        type="password"
        name="newPassword"
        className={`h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500" // CHANGED
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />
      {errorMsg && <p className="text-red-600 text-preset4m mt-2">{errorMsg}</p>}

      <label
        className={`text-preset4 font-bold mt-8 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Confirm password *
      </label>
      <input
        type="password"
        name="confirmNewPassword"
        className={`h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500" // CHANGED
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />
      {errorMsg && <p className="text-red-600 text-preset4m mt-2">{errorMsg}</p>}

      <button
        className="mt-5 mb-4 text-neutral-0 bg-teal-700 h-[46px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#A9A9A9]"
        type="submit"
      >
        Reset password
      </button>

      <button
        type="button"
        onClick={() => navigate("/auth")}
        className={`text-preset4 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Back to login
      </button>
    </form>
  );
}