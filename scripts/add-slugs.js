/**
 * Script de migração: Adiciona campo slug aos projetos existentes no banco
 * 
 * Como usar:
 * node scripts/add-slugs.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Função para gerar slug
function generateSlug(title) {
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

// Schema do projeto
const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  image: Array,
  repoURL: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo' }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function addSlugsToProjects() {
  try {
    console.log('🔌 Conectando ao MongoDB...');
    
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('❌ MONGODB_URI não encontrado no .env');
      console.log('\n💡 Crie um arquivo .env na raiz do projeto com:');
      console.log('MONGODB_URI=sua-connection-string-aqui');
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado com sucesso!\n');

    // Busca todos os projetos sem slug
    const projectsWithoutSlug = await Project.find({ 
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: '' }
      ]
    });

    console.log(`📊 Encontrados ${projectsWithoutSlug.length} projetos sem slug\n`);

    if (projectsWithoutSlug.length === 0) {
      console.log('✅ Todos os projetos já têm slug!');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Adiciona slug a cada projeto
    let updated = 0;
    let errors = 0;

    for (const project of projectsWithoutSlug) {
      try {
        const slug = generateSlug(project.title);
        await Project.updateOne(
          { _id: project._id },
          { $set: { slug: slug } }
        );
        
        console.log(`✅ "${project.title}" -> "${slug}"`);
        updated++;
      } catch (error) {
        console.error(`❌ Erro ao atualizar "${project.title}":`, error.message);
        errors++;
      }
    }

    console.log(`\n📈 Resumo:`);
    console.log(`   ✅ Atualizados: ${updated}`);
    console.log(`   ❌ Erros: ${errors}`);
    console.log(`\n🎉 Migração concluída!`);

  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Conexão fechada');
  }
}

// Executa o script
addSlugsToProjects();
