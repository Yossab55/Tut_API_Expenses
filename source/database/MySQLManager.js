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
  try {
    const [results] = await execute(query, values);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};

MySQLManager.deleteOne = async function deleteOne(values) {
  const query = this.buildDeleteCondition();
  try {
    const [results] = await execute(query, values);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};

MySQLManager.deleteAll = async function deleteAll() {
  const query = this.buildDeleteAll();
  try {
    const [results] = await execute(query);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};

MySQLManager.update = async function update(values) {
  const query = this.buildDeleteAll();
  try {
    const [results] = await execute(query, values);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};
export { MySQLManager };
