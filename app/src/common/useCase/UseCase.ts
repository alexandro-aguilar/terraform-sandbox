export default interface UseCase<U, T> {
  execute(port?: U): T;
}