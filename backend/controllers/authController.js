import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/userModel.js";
import { JWT_SECRET } from "../middleware/requireAuth.js";

const TOKEN_TTL = "7d";

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  });
}

function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email || !validator.isEmail(String(email))) {
      return res.status(400).json({ success: false, message: "A valid email is required" });
    }
    if (!password || String(password).length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 8 characters" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash,
    });

    return res.status(201).json({
      success: true,
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    return res.status(200).json({
      success: true,
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// GET /api/auth/me  (requires auth)
export async function me(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user: publicUser(user) });
  } catch (err) {
    console.error("me error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
