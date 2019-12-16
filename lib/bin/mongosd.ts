#!/usr/bin/env node

import ora from 'ora'
import * as path from 'path'
import fs from 'fs'

const arg = process.argv[2]

if (arg === '--init') {
  const loader = ora('Initializing...').start()

  setTimeout(() => {
    loader.text = 'Creating configuration file...'
    fs.writeFile(
      path.join(process.cwd(), 'mongosd.json'),
      `{ modelsPath: '', seedersPath: '', dbUri: '' }`,
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
