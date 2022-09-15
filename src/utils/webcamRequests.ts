import React from "react"
import { NavigateFunction } from "react-router-dom"

import { User } from "../entities/User"
import { Face } from "../entities/Face"
import { AuthFunc } from "../contexts/AuthContext"

import { api } from "../services/api"
import { faceApi } from "../services/faceApi"

type setUser = React.Dispatch<React.SetStateAction<User | null>>

async function getFaces(form: FormData) {
  const getFaceResponse = await faceApi.post("/faces", form, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  const { faces } = getFaceResponse.data

  return faces
}

export async function signUp(form: FormData, setUser: setUser) {
  const faces = await getFaces(form)
  const { data } = await api.put("/userfaces", { faces })

  setUser(data.user)
}

export async function login(
  form: FormData,
  login: string,
  password: string,
  logIn: AuthFunc,
  navigate: NavigateFunction
) {
  const compareForm = new FormData()

  const { data } = await api.get("/faces")

  const faces: Face[] = data.faces
  const familiarFaces: Face[] = []
  const userFaces = await getFaces(form)

  faces.forEach(face => {
    const familiar_face = eval(face.face)[0]
    familiarFaces.push(familiar_face)
  })

  compareForm.append("faces", userFaces)
  compareForm.append("familiar_faces", `[${familiarFaces}]`)

  const compareFacesResponse = await faceApi.post("/compare", compareForm, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  let { res, index } = compareFacesResponse.data
  const names = faces.map(face => face.user.name)
  index = Number(index)

  const probabilities = eval(res)

  const prob = parseInt((probabilities[index] * 100).toFixed(2))
  console.log(`Pessoa: ${names[index]}. Probabilidade de ${prob}%`)

  try {
    const name = names[index]
    await logIn({ login, name, password })
  } catch (error: any) {
    const errorMessage = error.response.data.error

    navigate("/login", {
      replace: true,
      state: { error: true, errorMessage }
    })
  }
}
