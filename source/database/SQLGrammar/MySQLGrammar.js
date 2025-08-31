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
  tableName: null,
  fields: null,
  filters: null,
  orderColumns: null,
  havingFilters: null,
  initial: function initialParts(
    tableName,
    fields,
    filters,
    orderColumns,
    havingFilters
  ) {
    this.tableName = tableName;
    this.fields = fields;
    this.filters = filters;
    this.orderColumns = orderColumns;
    this.havingFilters = havingFilters;
  },
  buildGetUserProcedure: function buildGetUserProcedure(id) {
    return `CALL ${procedures.getOneUser}(${id});`;
  },
  buildGetTodayExpensesProcedure: function buildGetTodayExpensesProcedure(
    userId
  ) {
    return `CALL ${procedures.todayExpenses}(${userId});`;
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
    query += ";";
    console.log(query);
    return query;
  },
  buildInsert: function buildInsertQuery() {
    const startPart = `INSERT INTO ${this.tableName}`;
    const fieldsToInsert = this.fields.join(", ");
    let valuesHolder = "";
    for (let i = 0; i < this.fields.length; i++) {
      valuesHolder += "?";
      if (this.fields.length - 1 != i) valuesHolder += ", ";
    }
    const query = `${startPart} (${fieldsToInsert}) VALUES (${valuesHolder});`;
    return query;
  },
  buildDeleteCondition: function buildDeleteCondition() {
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
    if (!this.filters); //todo throw error
    const startPart = `UPDATE FROM ${this.tableName}`;
    const setPart = this.fields.join(" = ?, ") + " = ?";
    const wherePart = this.filters.join(" ");
    const query = `${startPart} SET ${setPart} ${wherePart};`;
    return query;
  },
  buildOrderBy: function buildOrderBy() {
    console.log(this.tableName, this.orderColumns);
    const isOrderColumnInFields = this.orderColumns.every((column) =>
      this.fields.includes(column)
    );
    if (!isOrderColumnInFields)
      throw new Error("You're order column is not correct");
    const orderPart = `ORDER BY ${this.orderColumns.join(", ")}`;
    let query = `${orderPart}`;
    if (this.havingFilters) {
      const havingPart = ` HAVING ${this.havingFilters.join(" ")}`;
      query += havingPart;
    }
    query += ";";
    return query;
  },
  addMultiplyQueriesTogether: function addMultiplyQueriesTogether(...queries) {
    const length = queries.length;
    for (let i = 0; i < length - 1; i++) {
      queries[i] = queries[i].slice(0, queries[i].length - 1);
    }
    return queries.join(" ");
  },
};

export { MySQLGrammar };
