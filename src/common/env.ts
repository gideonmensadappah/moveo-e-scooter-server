export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    db: process.env.BASE_DB,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});
