export default interface Controller<T = object, U = object> {
  execute(port?: T): Promise<U>
}