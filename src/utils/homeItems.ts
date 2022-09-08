import { DefaultItem, ToUpdate } from "../components/UpdateItem"

interface Item {
  htmlFor: DefaultItem
  label: string
  inputType: string
  update: ToUpdate
  select: boolean
}

export const items: Item[] = [
  {
    htmlFor: "nickname",
    label: "APELIDO",
    inputType: "text",
    update: { nickname: true },
    select: false
  },
  {
    htmlFor: "email",
    label: "EMAIL",
    inputType: "email",
    update: { email: true },
    select: false
  },
  {
    htmlFor: "password",
    label: "SENHA",
    inputType: "password",
    update: { password: true },
    select: false
  },
  {
    htmlFor: "phone",
    label: "TELEFONE",
    inputType: "tel",
    update: { phone: true },
    select: false
  },
  {
    htmlFor: "birthDate",
    label: "DATA DE NASCIMENTO",
    inputType: "date",
    update: { birthDate: true },
    select: false
  },
  {
    htmlFor: "gender",
    label: "SEXO",
    inputType: "select",
    update: { gender: true },
    select: true
  }
]
