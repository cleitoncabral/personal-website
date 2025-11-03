import mongoose from "mongoose";
const {Schema} = mongoose

// Função para gerar slug a partir do título
function generateSlug(title: string): string {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

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
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonalInfo'
    }
  },
  {
    timestamps: false,
  }
)

// Gera slug automaticamente antes de salvar
ProjectsDataSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = generateSlug(this.title);
  }
  next();
});

ProjectsDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export default mongoose.models.Project || mongoose.model('Project', ProjectsDataSchema)