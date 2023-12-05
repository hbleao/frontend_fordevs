export enum HttpStatusCode {
  ok = 200,
  noContent = 201,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  internalServerError = 500,
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
