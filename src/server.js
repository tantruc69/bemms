const express = require('express');
const { sequelize } = require('./config/database');
const linkRoutes = require('./routes/linkRoutes');
require('dotenv').config();
const authRoutes = require("./routes/authRoutes")
const app = express();

app.use(express.json());
app.use('/', linkRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Shortlink API' });
});
app.use('/auth', authRoutes);
sequelize.authenticate()
  .then(() => {
    console.log('Kết nối PostgreSQL thành công');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Cơ sở dữ liệu đã đồng bộ');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Máy chủ chạy trên cổng ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Lỗi kết nối PostgreSQL:', err);
    process.exit(1);
  });

module.exports = app;