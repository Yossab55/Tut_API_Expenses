import { MySQLGrammar } from "./MySQLGrammar";

const MySQLMapping = {
  select: MySQLGrammar.buildSelect,
  orderBy: MySQLGrammar.buildGroupBy,
  groupBy: MySQLGrammar.buildGroupBy,
};

export { MySQLMapping };
