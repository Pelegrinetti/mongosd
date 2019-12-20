import db from '../../dist/database'

export default function() {
  return Promise.all(
    db.modelNames().map(async model => {
      await db.models[model].deleteMany({})
    })
  )
}
