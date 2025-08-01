async function loadTools() {
	const tollsContainer = document.getElementById('tools-technology__items');
	if (!tollsContainer) return;

	try {
		const response = await fetch('/data/tolls.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const tolls = await response.json();

		tolls.forEach(item => {
			const tollDiv = document.createElement('div');
			tollDiv.classList.add('tool');

			tollDiv.innerHTML = `
                <i class="${item.icon_class}" style="color: ${item.color};"></i>
                <h4>${item.nome}</h4>
                <p>${item.description}</p>
            `;
			tollsContainer.appendChild(tollDiv);
		});

		if (typeof ScrollReveal !== 'undefined') {
			ScrollReveal().reveal('section--tools-technology', {
				origin: 'right',
				duration: 2000,
				distance: '20%',
			});
		}
	} catch (error) {
		console.error('Erro ao carregar as tolls: ', error);
		projectsContainer.innerHTML = `<p>Não foi possível carregar as tools.</p>`;
	}
}

async function loadProjects() {
	const projectsContainer = document.getElementById('project__items');
	if (!projectsContainer) return;

	try {
		const response = await fetch('/data/projects.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const projects = await response.json();

		projects.forEach(item => {
			const projectDiv = document.createElement('div');
			projectDiv.classList.add('project');

			projectDiv.innerHTML = `
                <img class="project__image" src="/images/img-projects/${item.image_path}" alt="imagem do projeto" />

                <h3>${item.project_title}</h3>

                <p>
                    ${item.description}
                </p>

                <h4>Tecnologias Utilizadas</h4>

                <ul class="project__tech-list">
                    <li><i class="${item.technology[0]} icon-project-technology"></i></li>
                    <li><i class="${item.technology[1]} icon-project-technology"></i></li>
                    <li><i class="${item.technology[2]} icon-project-technology"></i></li>
                </ul>

                <div class="project__access">
                    <a href="${item.link_application}" target="_blank">aplicação</a>
                    <a href="${item.link_code}" target="_blank">ver código</a>
                </div>
            `;
			projectsContainer.appendChild(projectDiv);
		});

		if (typeof ScrollReveal !== 'undefined') {
			ScrollReveal().reveal('section--projects', {
				origin: 'left',
				duration: 1000,
				distance: '20%',
			});
		}
	} catch (error) {
		console.error('Erro ao carregar os projetos: ', error);
		projectsContainer.innerHTML = `<p>Não foi possível carregar os projetos.</p>`;
	}
}

async function loadTraining() {
	const trainingContainer = document.getElementById('training__items');
	if (!trainingContainer) {
		console.error("Elemento com ID 'training__items' não encontrado no DOM.");
		return;
	}

	try {
		const response = await fetch('data/training.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const trainingData = await response.json();

		trainingData.forEach(item => {
			const trainingDiv = document.createElement('div');
			trainingDiv.classList.add('training');

			trainingDiv.innerHTML = `
                <h5>${item.titration}</h5>
                <h4>${item.name}</h4>
                <p>${item.institution} - ${item.campus}</p>
                <p>${item.start_date} - ${item.end_date}</p>
            `;
			trainingContainer.appendChild(trainingDiv);
		});

		if (typeof ScrollReveal !== 'undefined') {
			ScrollReveal().reveal('.section--training', {
				origin: 'right',
				duration: 2000,
				distance: '20%',
			});
		}
	} catch (error) {
		console.error('Erro ao carregar os dados de treinamento: ', error);
		// 5. Use trainingContainer no bloco catch
		if (trainingContainer) {
			trainingContainer.innerHTML = `<p>Não foi possível carregar os dados de treinamento.</p>`;
		}
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const sections = document.querySelectorAll('.main > section');
	const navItems = document.querySelectorAll('.nav-item');
	const header = document.querySelector('header');

	window.addEventListener('scroll', () => {
		// Obtain a altura do header, o 60 é porque no css o header está com 60
		const headerHeight = header ? header.offsetHeight : 60;

		// Calcula a posição de rolagem ajustada, descontando a altura do cabeçalho.
		const scrollPosition = window.scrollY - headerHeight;

		// Lógica para a sombra do cabeçalho
		if (header) {
			if (scrollPosition <= 0) {
				header.style.boxShadow = 'none';
			} else {
				header.style.boxShadow = '2.5px 1px 10px var(--color-primary-accent)';
			}
		}

		let activeSectionIndex = 0;
		let foundActive = false; // Flag para indicar se uma seção ativa foi encontrada

		// Itera sobre as seções de TRÁS PARA FRENTE.
		// Isso é crucial para seções pequenas e transições suaves.
		for (let i = sections.length - 1; i >= 0; i--) {
			const section = sections[i];

			if (section) {
				// Define o "ponto de gatilho" para quando a seção deve ser considerada ativa.
				// O `+ 200` é um valor de px mínimo que estará entre o header e a section para ativá-la.
				const activationTriggerPoint = section.offsetTop - (headerHeight + 200);

				// A seção é ativa se a posição de rolagem ajustada atingiu ou ultrapassou seu ponto de gatilho.
				if (scrollPosition >= activationTriggerPoint) {
					activeSectionIndex = i;
					foundActive = true;
					break;
				}
			}
		}

		// Lógica para lidar com casos de borda:
		// Se nenhuma seção foi ativada (estamos acima da primeira seção)
		if (!foundActive && sections.length > 0 && scrollPosition < sections[0].offsetTop - headerHeight) {
			activeSectionIndex = 0; // Ativa a primeira seção ("Home")
		}

		// Se nenhuma seção foi encontrada como ativa E estamos abaixo da última seção
		else if (!foundActive && sections.length > 0) {
			// Isso pode acontecer no rodapé, para manter a última seção ativa
			activeSectionIndex = sections.length - 1;
		}

		// Remove a classe 'active' de todos os itens de navegação
		navItems.forEach(element => {
			element.classList.remove('active');
		});

		// Adiciona a classe 'active' ao item de navegação correspondente
		if (navItems[activeSectionIndex]) {
			navItems[activeSectionIndex].classList.add('active');
		}
	});

	if (typeof ScrollReveal !== 'undefined') {
		ScrollReveal().reveal('#imagem-pessoal', {
			origin: 'left',
			duration: 3000,
			distance: '20%',
		});

		ScrollReveal().reveal('.banner__content', {
			origin: 'right',
			duration: 3000,
			distance: '20%',
		});

		ScrollReveal().reveal('#section--tools-technology', {
			origin: 'right',
			duration: 2000,
			distance: '20%',
		});

		ScrollReveal().reveal('#section--projects', {
			origin: 'left',
			duration: 1000,
			distance: '20%',
		});

		ScrollReveal().reveal('#section--training', {
			origin: 'right',
			duration: 2000,
			distance: '20%',
		});
	} else {
		console.warn('A biblioteca ScrollReveal não foi encontrada. As animações não funcionarão.');
	}

	loadTools();
	loadProjects();
	loadTraining();
});
