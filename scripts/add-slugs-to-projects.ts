/**
 * Script de migração: Adiciona campo slug aos projetos existentes no banco
 * 
 * Como usar:
 * 1. Certifique-se que seu .env está configurado com MONGODB_URI
 * 2. Execute: npx ts-node scripts/add-slugs-to-projects.ts
 */

import mongoose from 'mongoose';
import connectToDB from '../mongodb';
import Project from '../models/project';

// Função para gerar slug (mesma do modelo)
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

async function addSlugsToProjects() {
  try {
    console.log('🔌 Conectando ao MongoDB...');
    await connectToDB();
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
      process.exit(0);
    }

    // Adiciona slug a cada projeto
    let updated = 0;
    let errors = 0;

    for (const project of projectsWithoutSlug) {
      try {
        const slug = generateSlug(project.title);
        project.slug = slug;
        await project.save();
        
        console.log(`✅ "${project.title}" -> "${slug}"`);
        updated++;
      } catch (error: any) {
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
