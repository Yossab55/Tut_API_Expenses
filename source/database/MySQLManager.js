import { mainPool } from "./DBConnection.js";
import { MySQLGrammar } from "./SQLGrammar/MySQLGrammar.js";

const MySQLManager = Object.create(MySQLGrammar);
