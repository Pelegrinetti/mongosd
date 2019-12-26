import { exec } from 'child_process'

import truncate from '../utils/truncate'
import setMongoSDConfig from '../utils/setMongoSDConfig'

beforeAll(async done => {
  await truncate()

  done()
})

describe('MongoSD tests', () => {
  it('should init mongosd', async () => {
    const result = exec('node dist/bin/mongosd init')

    return setMongoSDConfig
      .then(() => {
        result.on('exit', code => {
          expect(code).toBe(0)
        })
      })
      .catch(err => {
        console.log(`> Error: ${err.message}`)
        process.exit(1)
      })
  })

  it('should create foo seeder', () => {
    const result = exec('node dist/bin/mongosd seeder:create foo')

    result.on('exit', code => {
      expect(code).toBe(0)
    })
  })

  it("shouldn't create foo seeder without seeder name", () => {
    const result = exec('node dist/bin/mongosd seeder:create')

    result.on('exit', code => {
      expect(code).toBe(1)
    })
  })

  it('should run seeders', () => {
    const result = exec('node dist/bin/mongosd seeder:run')

    result.on('exit', code => {
      expect(code).toBe(0)
    })
  })

  it('should run seeders all seeders again', () => {
    const result = exec('node dist/bin/mongosd seeder:run --all')

    result.on('exit', code => {
      expect(code).toBe(0)
    })
  })
})
