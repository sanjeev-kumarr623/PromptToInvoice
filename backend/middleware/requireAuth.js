import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-insecure-secret-change-me";

// Verifies the "Authorization: Bearer <token>" header and attaches
// req.userId / req.userEmail for downstream handlers.
export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    req.userEmail = payload.email;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
    });
  }
}

export { JWT_SECRET };
