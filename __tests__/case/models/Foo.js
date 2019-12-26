const db = require('../../../dist/database').default

const FooSchema = new db.Schema({
  foo: String,
})

module.exports = db.model('Foo', FooSchema)
