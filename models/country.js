module.exports = (sql, type) => {
  return sql.define('country', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    continent: type.STRING
  });
}