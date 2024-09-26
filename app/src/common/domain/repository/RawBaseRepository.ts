import { QueryBuilder } from "typeorm";
import Repository from "./Repository";

export default abstract class RawBaseRepository<T> implements Repository<T, T> {
  protected abstract buildQuery(port?: T): Promise<QueryBuilder<T>>;

  execute(port?: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
}