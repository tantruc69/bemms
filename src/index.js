const express = require("express");
const pool = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/links", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM links");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const mac = req.headers["x-mac-address"] || null;
  const userAgent = req.headers["user-agent"] || "";
  const deviceInfo = userAgent;
  const loginMethod = "email-password";
  let location = null;

  try {
    const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
    if (geoRes.data?.status === "success") {
      location = `${geoRes.data.city}, ${geoRes.data.regionName}, ${geoRes.data.country}`;
    }
  } catch (geoErr) {
    console.warn("Không lấy được vị trí IP:", geoErr.message);
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      await pool.query(
        `INSERT INTO user_login_logs (user_id, ip_address, mac_address, device_info, location, login_method, user_agent, status)
           VALUES (NULL, $1, $2, $3, $4, $5, $6, $7)`,
        [ip, mac, deviceInfo, location, loginMethod, userAgent, "failed_email"]
      );
      return res.status(401).json({ message: "Email không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      await pool.query(
        `INSERT INTO user_login_logs (user_id, ip_address, mac_address, device_info, location, login_method, user_agent, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          user.id,
          ip,
          mac,
          deviceInfo,
          location,
          loginMethod,
          userAgent,
          "failed_password",
        ]
      );
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    await pool.query(
      "UPDATE users SET last_login_at = NOW(), login_count = login_count + 1 WHERE id = $1",
      [user.id]
    );

    await pool.query(
      `INSERT INTO user_sessions (user_id, ip_address, mac_address, device_info, location, is_successful)
         VALUES ($1, $2, $3, $4, $5, $6)`,
      [user.id, ip, mac, deviceInfo, location, true]
    );

    await pool.query(
      `INSERT INTO user_login_logs (user_id, ip_address, mac_address, device_info, location, login_method, user_agent, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        user.id,
        ip,
        mac,
        deviceInfo,
        location,
        loginMethod,
        userAgent,
        "success",
      ]
    );

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      last_login_at: user.last_login_at,
    });
  } catch (err) {
    console.error("Lỗi login:", err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password, full_name } = req.body;

  try {
    const checkUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (username, email, password_hash, full_name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, username, email, full_name
    `,
      [username, email, password_hash, full_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Lỗi đăng ký:", err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
