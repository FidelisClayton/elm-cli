export const getFileName = moduleName => {
  const parts = moduleName.split(".")
  const lastIndex = parts.length - 1

  return parts[lastIndex] + '.elm'
}

const extractExposing = module => {
  const exposing =
    module
      .split("[")
      .pop()
      .split("]")
      .shift()
      .split(",")

  return exposing
}

export const extractModuleInfo = module => {
  const name = module.split("[")[0]
  const exposing = extractExposing(module)

  if (exposing.length > 1) {
    return { name, exposing }
  }

  return { name, exposing: [] }

}

export const getFilePath = moduleName => {
  const parts = moduleName.split(".")
  const lastIndex = parts.length - 1

  return parts.length > 1
      ? parts.slice(0, lastIndex).join("/") + "/"
      : "./"
}
