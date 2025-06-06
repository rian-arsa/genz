export type TResponse<T> = {
  success: string,
  message: string,
  data: T
}

export type Response = {
  success: boolean,
  message: string,
}