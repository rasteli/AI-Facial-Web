import { User } from "../entities/User"
import { Face } from "../entities/Face"

import { api } from "../services/api"
import { faceApi } from "../services/faceApi"

export async function singUp(getForm: FormData) {
  const getFaceResponse = await faceApi.post("/getface", getForm, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  const { faces } = getFaceResponse.data
  const response = await api.put("/userface", { faces })

  console.log(response.data)
}

export async function login(user: User | null) {
  if (!user) return

  const compareForm = new FormData()

  const response = await api.get("/faces")
  const familiar_faces: Face[] = []

  response.data.faces.forEach((face: Face) => {
    const familiar_face = eval(face.face)[0]
    familiar_faces.push(familiar_face)
  })

  console.log(user)

  compareForm.append("faces", user.face.face)
  compareForm.append("familiar_faces", `[${familiar_faces}]`)

  const compareFacesResponse = await faceApi.post("/compare", compareForm, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  let { res, index } = compareFacesResponse.data
  const names = [
    "Joshua",
    "Rasteli",
    "Jarbas",
    "Leonardo",
    "João Bolito",
    "Fabrício",
    "Marrenta",
    "Guidelli"
  ]

  res = eval(res)
  index = Number(index)

  const prob = parseInt((res[index] * 100).toFixed(2))
  console.log(`Pessoa: ${names[index]}. Probabilidade de ${prob}%`)
}
