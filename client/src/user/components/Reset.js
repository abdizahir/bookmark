import { useState } from "react";
import { useSelector } from "react-redux";
import { useResetUserMutation } from "../../store/apiSlice";
import { useNavigate } from "react-router"; // CHANGED

export default function Reset() {
  const [resetUser] = useResetUserMutation();
  const mode = useSelector((s) => s.theme.mode);
  const logoTheme =
    mode === "dark"
      ? "/images/logo-dark-theme.svg"
      : "/images/logo-light-theme.svg";

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate(); // CHANGED

  const handleResetEmail = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      setErrorMsg("Enter your email first");
      setSuccessMsg("");
      return;
    }

    try {
      const data = await resetUser({ email }).unwrap();
      setErrorMsg("");
      setSuccessMsg(data?.msg || "Reset link sent to email");
      e.target.reset();
    } catch (err) {
      setSuccessMsg("");
      setErrorMsg(err?.data?.msg || err?.data?.message || "Reset failed");
    }
  };

  return (
    <form
      onSubmit={handleResetEmail}
      className={`flex flex-col rounded-md mx-4 px-5 py-5 w-full sm:w-[448px] ${
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
        Forgot your password?
      </h3>

      <p
        className={`text-preset4 mt-2 font-medium ${
          mode === "light" ? "text-neutral-800" : "text-neutral-dark-100" // CHANGED
        }`}
      >
        Enter your email address below and we’ll send you a link to reset your
        password.
      </p>

      <label
        className={`text-preset4 font-bold mt-8 mb-2 ${
          mode === "light" ? "text-neutral-900" : "text-neutral-0" // CHANGED
        }`}
      >
        Email *
      </label>

      <input
        type="email"
        name="email"
        className={`h-[42px] rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
          mode === "light"
            ? "bg-neutral-0 text-neutral-900 outline-neutral-500" // CHANGED
            : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
        }`}
      />

      {errorMsg && (
        <p className="text-red-600 text-preset4m mt-2">
          Enter a valid email address.
        </p>
      )}
      {successMsg && (
        <p className="text-green-600 text-preset4m mt-2">{successMsg}</p>
      )}

      <button
        className="mt-5 mb-4 text-neutral-0 bg-teal-700 h-[46px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#A9A9A9]"
        type="submit"
      >
        Send reset link
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