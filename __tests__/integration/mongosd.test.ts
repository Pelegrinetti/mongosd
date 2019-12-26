import { exec } from 'child_process'

import truncate from '../utils/truncate'
import setMongoSDConfig from '../utils/setMongoSDConfig'

beforeAll(async done => {
  await truncate()

  done()
})

describe('MongoSD tests', () => {
  it('should init mongosd', () => {
    const result = exec('node dist/bin/mongosd init')

    result.on('exit', async code => {
      await setMongoSDConfig
      expect(code).toBe(0)
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
      process.kill(-result.pid)
    })
  })
})
