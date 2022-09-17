export function getErrorMessage(error: any) {
  const clientError = error.message
  const apiError = error.response?.data.error

  const errorMessage = error.hasOwnProperty("response") ? apiError : clientError

  return errorMessage
}
