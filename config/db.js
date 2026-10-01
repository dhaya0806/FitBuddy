const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mariadb",
    logging: false
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();

    console.log("✅ MariaDB connected successfully");
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(
      `Host: ${process.env.DB_HOST || "127.0.0.1"}:${process.env.DB_PORT || 3306}`
    );

    return sequelize;
  } catch (error) {
    console.error("❌ MariaDB connection failed:");
    console.error(error.message);
    throw error;
  }
}

module.exports = {
  sequelize,
  connectDB
};