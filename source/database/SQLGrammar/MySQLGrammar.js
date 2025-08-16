const procedures = {
  getOneUser: "findUser",
  todayExpenses: "user_today_expenses",
};
const MySQLGrammar = {
  buildGetUserProcedure: function buildGetUserProcedure(id) {
    return `call ${procedures.getOneUser}(${id});`;
  },
  buildGetTodayExpensesProcedure: function buildGetTodayExpensesProcedure(id) {
    return `call ${procedures.todayExpenses}(${id})`;
  },
  buildSelect: function buildSelect(fields, tableName, filters) {
    if (!fields)
      if (fields[0] == "*") {
        //todo throw error!
        if (
          fields.length != 1 //todo throw error!;
        );
      }
    let query = "";
    const columns = `SELECT ${fields.join(", ")}`;
    const table = `FROM ${tableName}`;
    query = `${columns} ${table}`;
    if (filters) {
      const where = ` WHERE ${filters.join(" ")}`;
      query += where;
    }
    return query;
  },
  buildInsert,
  buildDelete,
  buildUpdate,
};

export { MySQLGrammar };
