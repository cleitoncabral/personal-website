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
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.PersonalInfo || mongoose.model('PersonalInfo', PersonalDataSchema)