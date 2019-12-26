import fs from 'fs'
import * as path from 'path'
import 'dotenv/config'

export default new Promise((resolve, reject) => {
  fs.writeFile(
    path.join(process.cwd(), 'mongosd.json'),
    JSON.stringify(
      {
        modelsPath: process.env.MODELS_PATH,
        seedersPath: process.env.SEEDERS_PATH,
        dbUri: process.env.DB_URI,
      },
      null,
      2
    ),
    err => {
      if (err) {
        reject(err)
      }

      resolve()
    }
  )
})
