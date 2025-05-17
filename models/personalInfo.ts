import mongoose from "mongoose";
const {Schema} = mongoose

const PersonalDataSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    experience: {
      type: Array,
      required: true
    },
    description: {
      type: Array,
      required: true
    },
    avatar_image: {
      type: String,
      required: true
    },
    hardSkills: {
      type: Array,
      required: true
    },
    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }]
  },
  {
    timestamps: false,
  }
)

PersonalDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export default mongoose.models.PersonalInfo || mongoose.model('PersonalInfo', PersonalDataSchema)