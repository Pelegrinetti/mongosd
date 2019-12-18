import db from '../database'

const SeederSchema = new db.Schema(
  {
    seeder_name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

export default db.model('Seeder', SeederSchema)
