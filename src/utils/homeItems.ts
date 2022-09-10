import { DefaultItem, ToUpdate } from "../components/UpdateItem"

interface Item {
  htmlFor: DefaultItem
  label: string
  inputType: string
}

export const items: Item[] = [
  {
    htmlFor: "name",
    label: "NOME",
    inputType: "text"
  },
  {
    htmlFor: "nickname",
    label: "APELIDO",
    inputType: "text"
  },
  {
    htmlFor: "email",
    label: "EMAIL",
    inputType: "email"
  },
  {
    htmlFor: "password",
    label: "SENHA",
    inputType: "password"
  },
  {
    htmlFor: "phone",
    label: "TELEFONE",
    inputType: "tel"
  },
  {
    htmlFor: "birthDate",
    label: "DATA DE NASCIMENTO",
    inputType: "date"
  },
  {
    htmlFor: "gender",
    label: "SEXO",
    inputType: "select"
  }
]
