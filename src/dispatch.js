import { askVersion, askModule, askCore } from './prompts'
import { showTypeAliases, showTypes, showValues } from './docs'
import { fetchPackage, fetchVersions } from './api'

export default (eventEmitter) => {
  eventEmitter.on('elm-cli', (event) => {
    switch (event.type) {
      case 'fetch-package-versions': {
        const packageName = event.payload.packageName

        fetchVersions(packageName)
          .then(askVersion)
        break
      }

      case 'fetch-package': {
        const { packageName, version } = event.payload

        fetchPackage(packageName, version)
          .then(askModule)
        break
      }

      case 'ask-core':
        askCore(event.payload)
        break

      case 'type-aliases':
        showTypeAliases(event.payload)
        break

      case 'types':
        showTypes(event.payload)
        break

      case 'values':
        showValues(event.payload)
        break
    }
  })
}
