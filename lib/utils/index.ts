import * as path from 'path'
import fs from 'fs'
import { Model, Document } from 'mongoose'

import { IConfigFile } from '../interfaces'

export function getConfigFile(): IConfigFile {
  if (fs.existsSync(path.join(process.cwd(), 'mongosd.json'))) {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'mongosd.json')).toString()
    )
  } else {
    return { modelsPath: '', seedersPath: '', dbUri: '' }
  }
}

export async function register(model: Model<Document>, data: Array<Object>) {
  try {
    await model.create(data)
  } catch (err) {
    console.log(`> Error: ${err.message}`)
  }
}
