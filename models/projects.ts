import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const {Schema} = mongoose

const ProjectsDataSchema = new Schema (
  {
    description: {
      type: String,
      required: true
    },
    image: {
      type: Array,
      required: true
    },
    repoURL: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonalInfo'
    }
  },
  {
    timestamps: true,
  }
)

ProjectsDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export default mongoose.models.projects || mongoose.model('projects', ProjectsDataSchema)