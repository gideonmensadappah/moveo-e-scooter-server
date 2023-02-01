import configuration from '../common/env';

export default (): string => {
  const { database } = configuration();
  const { db, userName, password } = database;

  return `mongodb+srv://${userName}:${password}@cluster0.pr1jv69.mongodb.net/${db}?retryWrites=true&w=majority`;
};
