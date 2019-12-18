import mongoose from 'mongoose'

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
      console.log(`> Can't connect to database: ${error.message}`)
    }
  }
)

export default mongoose
