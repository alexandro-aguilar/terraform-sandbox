export default interface Repository<T, U> {
  execute(port?: T): U
}