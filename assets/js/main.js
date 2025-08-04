// Importa as funções de carregamento de dados do módulo dataLoader
import { loadTools, loadProjects, loadTraining } from './modules/dataLoader.js';

// Importa as funções de efeitos de scroll do módulo scrollEffects
import { initScrollSpy, initScrollRevealAnimations } from './modules/scrollEffects.js';

// Adiciona um listener para garantir que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function () {
	// Carrega os dados dinâmicos das seções
	loadTools();
	loadProjects();
	loadTraining();

	// Inicializa os efeitos de scroll e a lógica do scroll spy
	initScrollSpy();

	// Inicializa as animações de revelação (ScrollReveal)
	initScrollRevealAnimations();
});
