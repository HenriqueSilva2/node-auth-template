import Sequelize from "sequelize";

function setupDatabase() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
    }
  );

  return sequelize;
}

export default setupDatabase;
