#!/usr/bin/env node

import ora from 'ora'
import * as path from 'path'
import fs from 'fs'
import { Model, Document } from 'mongoose'

import { getConfigFile, register } from '../utils'

import Seeder from '../model/Seeder'
import { ISeeder } from '../interfaces'

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
        process.exit(0)
      }
    )
  } else {
    console.log('> Error: Seeder name is not provided')
  }
}

if (arg === 'db:run') {
  const configFile = getConfigFile()

  if (process.argv[3] === '--all') {
    Seeder.deleteMany({}).catch(err => {
      console.log(`> Error: ${err.message}`)
      process.exit(1)
    })
  }

  // Ler o diretorio
  const seeders = fs.readdirSync(
    path.join(process.cwd(), configFile.seedersPath)
  )

  seeders.map(async (seed, index, all) => {
    const loader = ora(seed)

    try {
      // Validar se já existe
      if (!(await Seeder.findOne({ seeder_name: seed }))) {
        // Cadastrar
        await Seeder.create({ seeder_name: seed })

        const seeder: ISeeder = require(path.join(
          process.cwd(),
          configFile.seedersPath,
          seed
        ))

        const Model: Model<Document> = require(path.join(
          process.cwd(),
          configFile.modelsPath,
          seeder.modelName
        ))

        register(Model, seeder.data)
          .then(() => {
            loader.succeed()
            if (index === all.length - 1) process.exit(0)
          })
          .catch(err => {
            throw err
          })
      } else {
        if (index === all.length - 1) process.exit(0)
      }
    } catch (err) {
      loader.fail()
      console.log(err.message)
      process.exit(1)
    }
  })
}
