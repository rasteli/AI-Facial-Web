import useSWR from "swr"
import { api } from "../services/api"
import {
  UserDeletePayload,
  UserPostOrPutPayload
} from "../entities/UserPayload"

type HttpMethod = "get" | "post" | "put" | "delete"
type Payload = UserDeletePayload | UserPostOrPutPayload

export function useFetch<Data = any>(
  url: string,
  method: HttpMethod,
  payload?: Payload
) {
  const { data, error } = useSWR<Data>(url, async url => {
    const methods = {
      get: api.get,
      put: api.put,
      post: api.post,
      delete: api.delete
    }

    const httpRequest = methods[method]
    const response = await httpRequest(url, payload)

    return response.data
  })

  return { data, error }
}
