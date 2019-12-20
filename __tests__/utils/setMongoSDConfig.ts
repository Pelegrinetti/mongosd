import fs from 'fs'
import * as path from 'path'

export default new Promise((resolve, reject) => {
  fs.writeFile(
    path.join(process.cwd(), 'mongosd.json'),
    JSON.stringify(
      {
        modelsPath: path.join('__tests__', 'case', 'models'),
        seedersPath: path.join('__tests__', 'case', 'seeders'),
        dbUri: 'mongodb://localhost/mongosd-test',
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
