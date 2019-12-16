import * as path from 'path'
import fs from 'fs'

import { IConfigFile } from '../interfaces'

export function getConfigFile(): IConfigFile {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'mongosd.json')).toString()
  )
}
