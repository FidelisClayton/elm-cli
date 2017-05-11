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

const splice = (index, rem, replacement, string) => {
  return string.slice(0, index) + replacement + string.slice(index + Math.abs(rem));
};

const replaceAt = (index, replacement, string) => {
  return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
}

export const formatRecord = (record) => {
  let newRecord = record
  let canBreak = true

  for (let i = 1; i < newRecord.length; i ++) {
    const char = newRecord.charAt(i)

    if (char === "{") canBreak = false
    if (char === "}") canBreak = true

    if (char === "," && canBreak) {
      newRecord = replaceAt(i, " ", newRecord) // SHAME
      newRecord = splice(i + 1, 0, "\n    Ω", newRecord) // SHAME
    }
  }

  newRecord = newRecord.replace(/Ω/g, ",") // SHAME
  newRecord = splice(newRecord.lastIndexOf("}"), 0, "\n    ", newRecord)

  return newRecord
}

const generateSubTypesAnotation = (subTypes) => {
  return subTypes.map(subType => {
      const subTypeLength = subType.split(" ").length

      if (subTypeLength > 1)
        return `(${subType})`
      else
        return subType
    }).join(" ")
}

export const generateTypeField = (type) => {
  return type.cases.reduce((previous, current, index) => {
      const subTypes = current[1]

      const subTypesAnotation = generateSubTypesAnotation(subTypes)

      if (index === 0) {
        return previous + `    = ${current[0]} ${subTypesAnotation} \n`
      } else {
        return previous + `    | ${current[0]} ${subTypesAnotation}\n`
      }
    }, "")
}

const matchName = (name, items) =>
  items.filter(item => {
    return new RegExp(name, "ig").test(item.name)
  })

export const matchNameOnModule = (name, packages) => {
  const moduleOptions =
    packages.reduce((previous, _package) => {
      const { values, types, aliases } = _package

      return {
        values: [ ...previous.values, ...values ],
        types: [ ...previous.types, ...types ],
        aliases: [ ...previous.aliases, ...aliases ]
      }
    }, { values: [], types: [], aliases: [] })

  return {
    values: matchName(name, moduleOptions.values),
    types: matchName(name, moduleOptions.types),
    aliases: matchName(name, moduleOptions.aliases)
  }
}

export const extractModuleInfo = module => {
  const moduleName = module.split("[")[0]
  const exposing =
    module
      .split("[")
      .pop()
      .split("]")
      .shift()
      .split(",")

  if (exposing.length > 1) {
    return { name: moduleName, exposing }
  }

  return { name: moduleName, exposing: [] }

}
