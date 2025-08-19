/**
 * procedures for speed things and better abstraction
 * MySQLGrammar to just build the query separated from the
 * MySQLManager to be better clean code and easy to scale in future
 */
const procedures = {
  getOneUser: "findUser",
  todayExpenses: "user_today_expenses",
};
const MySQLGrammar = {
  fields: null,
  tableName: null,
  filters: null,
  inti: function initialParts(fields, tableName, filter) {
    this.fields = fields || this.fields;
    this.tableName = tableName || this.tableName;
    this.filters = filter || this.filters;
  },
  buildGetUserProcedure: function buildGetUserProcedure(id) {
    return `call ${procedures.getOneUser}(${id});`;
  },
  buildGetTodayExpensesProcedure: function buildGetTodayExpensesProcedure(id) {
    return `call ${procedures.todayExpenses}(${id})`;
  },
  buildSelect: function buildSelect() {
    if (this.fields) {
      if (this.fields[0] == "*") {
        if (this.fields.length != 1); //todo throw error!;
      }
    }

    let query = "";
    const columns = `SELECT ${this.fields.join(", ")}`;
    const table = `FROM ${this.tableName}`;
    query = `${columns} ${table}`;
    if (this.filters) {
      const where = ` WHERE ${this.filters.join(" ")}`;
      query += where;
    }
    console.log(query);
    return query;
  },
  buildInsert: function buildInsertQuery(valuesToInsert) {
    // Insert Into tableName (fields)
    //values (array of arrays) (value, value value, ...),
    // (value, value, value, ,...) .... until array finishes
    const startPart = `INSET INTO ${this.tableName}`;
    const fieldsToInsert = this.fields.join(", ");
    let valuesPart = "Values ";
    for (let i = 0; i < valuesToInsert.length; i++) {
      const collection = valuesToInsert[i];
      valuesPart += `(${collection.join(", ")})`;
      if (i != valuesToInsert.length - 1) valuesPart += ", ";
    }
    const query = `${startPart} (${fieldsToInsert}) ${valuesPart};`;
    return query;
  },
  buildDeleteCondition: function buildDeleteCondition() {
    // Delete from tableName where condition/filter
    if (!this.filters); //todo throw error
    const startPart = `DELETE FROM ${this.tableName}`;
    const wherePart = this.filters.join(" ");
    const query = `${startPart} ${wherePart};`;
    return query;
  },
  buildDeleteAll: function buildDeleteAll() {
    const startPart = `DELETE FROM ${this.tableName}`;
    const query = `${startPart};`;
    return query;
  },
  buildUpdate: function buildUpdate() {
    // update from tableName set value = ? , value = ? where filter
    if (!this.filters); //todo throw error
    const startPart = `UPDATE FROM ${this.tableName}`;
    const setPart = this.fields.join(" = ?, ") + " = ?";
    const wherePart = this.filters.join(" ");
    const query = `${startPart} ${setPart} ${wherePart};`;
    return query;
  },
};

export { MySQLGrammar };
