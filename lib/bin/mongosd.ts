#!/usr/bin/env node

import ora from 'ora'
import * as path from 'path'
import fs from 'fs'

import { getConfigFile } from '../utils'

const arg = process.argv[2]

if (arg === '--init') {
  const loader = ora('Initializing...').start()

  setTimeout(() => {
    loader.text = 'Creating configuration file...'
    fs.writeFile(
      path.join(process.cwd(), 'mongosd.json'),
      JSON.stringify({ modelsPath: '', seedersPath: '', dbUri: '' }, null, 2),
      err => {
        if (err) {
          loader.fail()
          console.log(`> Error: ${err.message}`)
          process.exit(1)
        }

        loader.succeed()
        process.exit(0)
      }
    )
  }, 1000)
}

if (arg === 'db:create') {
  const loader = ora('Creating...')

  if (process.argv[3]) {
    const configFile = getConfigFile()

    fs.mkdir(path.join(process.cwd(), configFile.seedersPath), err => {
      if (err) {
        if (err.code !== 'EEXIST') {
          console.log(
            `> Error while creating seeders directory: ${err.message}`
          )
          process.exit(1)
        }
      }
    })
    fs.writeFile(
      path.join(
        process.cwd(),
        configFile.seedersPath,
        `${Date.now()}-${process.argv[3]}.js`
      ),
      fs.readFileSync(
        path.resolve(__dirname, '..', '..', 'lib', 'templates', 'Seeder.txt')
      ),
      err => {
        if (err) {
          console.log(`> Error while write seeder: ${err.message}`)
          process.exit(1)
        }

        loader.succeed('Success!')
      }
    )
  } else {
    console.log('> Error: Seeder name is not provided')
  }
}
