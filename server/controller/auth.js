import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import nodemailer from "nodemailer";


export const signup = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({ fullname, email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });


    return res.status(201).json({ token, fullname: user.fullname, id: user.id });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: existingUser.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({
      token,
      fullname: existingUser.fullname,
      email: existingUser.email,
      id: existingUser.id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    // res.clearCookie("access_token", getAccessCookieOptions(req));
    return res.json({ msg: "logged out successfuly" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const reset = async (req, res, next) => {
  const { email } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = { user: { id: existingUser.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

    const rawClientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    let clientBaseUrl = rawClientUrl;
    try {
      clientBaseUrl = new URL(rawClientUrl).origin;
    } catch {}

    const resetLink = `${clientBaseUrl}/auth/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}"> to reset your password</a></p>`,
    });

    res.json({ msg: "Reset link sent to email" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};



export const resetPassword = async (req, res, next) => {
  const { newPassword, confirmNewPassword } = req.body;
  const token = req.query.token;

  if (newPassword !== confirmNewPassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  try {
    if (!token) return res.status(400).json({ msg: "Reset token is required" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ msg: "password has been reset successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};
