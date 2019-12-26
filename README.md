[![Actions Status](https://github.com/Pelegrinetti/mongosd/workflows/MongoSD%20Package/badge.svg)](https://github.com/Pelegrinetti/mongosd/actions?query=workflow%3A"
MongoSD+Package")

# MongoSD - Mongoose Seeder

A simple seeder for Mongoose.

## Installation:

Run `yarn add mongosd -D` or `npm install mongosd --save-dev`

## How to use:

Create initial config and configure with you need:

- `node_modules/.bin/mongosd init`

Default config file:

```
{
  "modelsPath": "path/to/your/models",
  "seedersPath": "path/to/your/seeders",
  "dbUri": "mongodb://localhost/awesome-db"
}
```

Create your first seeder:

- `node_modules/.bin/mongosd seeder:create NameOfSeeder`

Default seeder file:
Export an object with modelName and data prop.

- modelName is the model name.
- data is an array of object as schema of model.

```
module.exports = {
  modelName: 'Foo',
  data: [{ foo: 'Bar' }],
}
```

Run seeders in database:

- `node_modules/.bin/mongosd seeder:run`

You can run all seeders again with `--all` flag. Example: `node_modules/.bin/mongosd seeder:run --all`

## Roadmap:

- Add ES6 modules support
