import mongoose from 'mongoose'
import { existsSync } from 'fs'
import * as path from 'path'

import { getConfigFile } from '../utils'

const config = getConfigFile()

mongoose.connect(
  config.dbUri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  error => {
    if (error) {
      if (existsSync(path.join(process.cwd(), 'mongosd.json'))) {
        console.log(`> Can't connect to database: ${error.message}`)
      }
    }
  }
)

export default mongoose
