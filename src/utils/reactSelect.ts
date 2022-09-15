import { GroupBase, StylesConfig } from "react-select"

type Generic = { value: string; label: string }
type SelectStyles = StylesConfig<Generic, false, GroupBase<Generic>> | undefined

export const options = [
  { value: "Masculino", label: "Masculino" },
  { value: "Feminino", label: "Feminino" }
]

export const customStyles: SelectStyles = {
  menu: provided => ({
    ...provided,
    color: "#fbfffb",
    backgroundColor: "#262730"
  }),

  option: (provided, state) => {
    const backgroundColor = state.isSelected
      ? "#3c5dfe"
      : state.isFocused
      ? "#535353"
      : "#262730"

    return {
      ...provided,
      backgroundColor
    }
  },

  control: (provided, state) => {
    const borderColor = state.isDisabled
      ? "#979797"
      : state.isFocused
      ? "#3c5dfe"
      : "#fbfffb"

    return {
      ...provided,
      borderColor,
      backgroundColor: "#262730"
    }
  },

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = "opacity 150ms"

    return {
      ...provided,
      opacity,
      transition,
      padding: "8px",
      color: "#fbfffb"
    }
  }
}
