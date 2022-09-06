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

  const { data } = await api.get("/faces")

  const faces: Face[] = data.faces
  const familiar_faces: Face[] = []

  faces.forEach(face => {
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
  const names = faces.map(face => face.user.name)
  index = Number(index)

  const probabilities = eval(res)

  const prob = parseInt((probabilities[index] * 100).toFixed(2))
  console.log(`Pessoa: ${names[index]}. Probabilidade de ${prob}%`)
}
