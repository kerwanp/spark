/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import type ConfigureCommand from '@adonisjs/core/commands/configure'
import { readPackageJSON, writePackageJSON } from 'pkg-types'

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()

  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider('@sparkjs/adonis/spark_provider')
  })

  const shouldInstallPackages = await command.prompt.confirm(
    `Do you want to install additional packages required by "@sparkjs/adonis"?`,
    { name: 'shouldInstallPackages' }
  )

  if (shouldInstallPackages) {
    await codemods.installPackages([
      {
        name: '@sparkjs/spark',
        isDevDependency: false,
      },
    ])
  }

  await updatePackageJson(command)
}

async function updatePackageJson(command: ConfigureCommand) {
  const path = command.app.makePath('package.json')
  const packageJson = await readPackageJSON(path)

  packageJson.imports = {
    ...packageJson.imports,
    '#spark/*': './app/spark/*.js',
  }

  await writePackageJSON(path, packageJson)
}
