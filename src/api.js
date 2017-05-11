import axios from 'axios'

export const BASE_URL = 'https://salty-woodland-15175.herokuapp.com/package'

const fetchVersionsUrl = packageName => `${BASE_URL}/${packageName}`
const fetchPackageUrl = (packageName, version) => `${BASE_URL}/${packageName}/${version}`

export const fetchVersions = packageName => {
  const url = fetchVersionsUrl(packageName)

  console.log(url)

  return axios.get(url)
          .then(res => ({ packageName, versions: res.data }))
}

export const fetchPackage = (packageName, version) => {
  const url = fetchPackageUrl(packageName, version)

  console.log(url)

  return axios.get(url)
          .then(res => res.data)
}
