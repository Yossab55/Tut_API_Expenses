import { execute } from "./DBConnection.js";
import { MySQLGrammar } from "./SQLGrammar/MySQLGrammar.js";

const MySQLManager = Object.create(MySQLGrammar);

MySQLManager.insert = async function insert(values) {
  const query = this.buildInsert();
  const [results] = await execute(query, values);
  return results;
};

MySQLManager.getUser = async function getUser(id, values) {
  const query = this.buildGetUserProcedure(id);
  const [results] = await execute(query, values);
  console.log(results);
  return results;
};

MySQLManager.select = async function selectStatement() {
  const query = this.buildSelect();
  const [results] = await execute(query);
  return results;
};

MySQLManager.selectWithOrderBy = async function selectWithOrderBy() {
  const query = this.addMultiplyQueriesTogether(
    this.buildSelect(),
    this.buildOrderBy()
  );
  console.log(query);
  const [results] = await execute(query);
  return results;
};

MySQLManager.deleteOne = async function deleteOne(values) {
  const query = this.buildDeleteCondition();
  const [results] = await execute(query, values);
  console.log(results);
  return results;
};

MySQLManager.deleteAll = async function deleteAll() {
  const query = this.buildDeleteAll();
  const [results] = await execute(query);
  console.log(results);
  return results;
};

MySQLManager.update = async function update(values) {
  const query = this.buildDeleteAll();
  const [results] = await execute(query, values);
  console.log(results);
  return results;
};
export { MySQLManager };
