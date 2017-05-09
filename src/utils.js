export const findItemByKey = (value, key, items) => {
  return items.filter(item => item[key] === value)
}

export const unescapeValues = (object) => {
  const keys = Object.keys(object)

  const newObject =
    keys.reduce((previous, key) => {
      const value = object[key]
      const unescapedValue = unescape(value)

      if (typeof value === "string") {
        return {
          ...previous,
          [key]: unescape(value).trim()
        }
      } else {
        return {
          ...previous,
          [key]: value
        }
      }
    }, {})

  return newObject
}
