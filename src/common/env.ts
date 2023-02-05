export default () => ({
  port: process.env.PORT || 3001,
  database: {
    db: process.env.BASE_DB,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});
