export default interface Adapter<T, U> {
  execute(port?: T): U
}