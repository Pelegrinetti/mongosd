import { spawn } from 'child_process'

import truncate from '../utils/truncate'
import setMongoSDConfig from '../utils/setMongoSDConfig'

beforeAll(async done => {
  await truncate()

  done()
})

describe('MongoSD tests', () => {
  it('should init mongosd', () => {
    const result = spawn('node dist/bin/mongosd.js init', { detached: true })

    result.on('exit', async code => {
      await setMongoSDConfig
      expect(code).toBe(0)
      process.kill(-result.pid)
    })

    result.on('close', () => {
      process.kill(-result.pid)
    })
  })

  it('should create foo seeder', () => {
    const result = spawn('node dist/bin/mongosd.js seeder:create foo', {
      detached: true,
    })

    result.on('exit', code => {
      expect(code).toBe(0)
    })
  })

  it("shouldn't create foo seeder without seeder name", () => {
    const result = spawn('node dist/bin/mongosd.js seeder:create', {
      detached: true,
    })

    result.on('exit', code => {
      expect(code).toBe(1)
      process.kill(-result.pid)
    })

    result.on('close', () => {
      process.kill(-result.pid)
    })
  })
})
