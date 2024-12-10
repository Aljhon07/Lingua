const { useState } = require("react")

export function wuseToggle(ininitalVal = false) {
  const [value, setValue] = useState(ininitalVal)

  const toggle = () => setValue((prev) => !prev)

  return [value, toggle]
}
