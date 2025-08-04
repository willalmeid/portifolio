/**
 * Carrega e exibe as ferramentas e tecnologias no DOM.
 */
export async function loadTools() {
	const toolsContainer = document.getElementById('tools-technology__items');
	if (!toolsContainer) {
		console.error("Elemento com ID 'tools-technology__items' não encontrado no DOM.");
		return;
	}

	try {
		const response = await fetch('/assets/data/tools.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const tools = await response.json();

		tools.forEach(item => {
			const toolDiv = document.createElement('div');
			toolDiv.classList.add('tool');

			toolDiv.innerHTML = `
                <i class="${item.icon_class}" style="color: ${item.color};"></i>
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            `;
			toolsContainer.appendChild(toolDiv);
		});
	} catch (error) {
		console.error('Erro ao carregar as ferramentas: ', error);
		toolsContainer.innerHTML = `<p class="placeholder-content">Não foi possível carregar as ferramentas.</p>`;
	}
}

/**
 * Carrega e exibe os projetos no DOM.
 */
export async function loadProjects() {
	const projectsContainer = document.getElementById('project__items');
	if (!projectsContainer) {
		console.error("Elemento com ID 'project__items' não encontrado no DOM.");
		return;
	}

	try {
		const response = await fetch('/assets/data/projects.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const projects = await response.json();

		projects.forEach(item => {
			const projectDiv = document.createElement('div');
			projectDiv.classList.add('project');

			let techIconsHtml = '';
			if (item.technology && Array.isArray(item.technology)) {
				techIconsHtml = item.technology
					.map(
						techClass => `
                    <li><i class="${techClass} icon-project-technology"></i></li>
                `
					)
					.join('');
			}

			projectDiv.innerHTML = `
                <img class="project__image" src="/assets/images/projects/${item.image_path}" alt="imagem do projeto" />

                <div class="project__information">
                    <h3>${item.project_title}</h3>
                    <p>${item.description}</p>
                </div>

                <div class="project__tools">
                    <h4>Tecnologias Utilizadas</h4>
                    <ul class="project__tech-list">
                        ${techIconsHtml}
                    </ul>
                </div>

                <div class="project__access">
                    <a class="button" href="${item.link_application}" target="_blank">aplicação</a>
                    <a class="button" href="${item.link_code}" target="_blank">ver código</a>
                </div>
            `;
			projectsContainer.appendChild(projectDiv);
		});
	} catch (error) {
		console.error('Erro ao carregar os projetos: ', error);
		projectsContainer.innerHTML = `<p class="placeholder-content">Não foi possível carregar os projetos.</p>`;
	}
}

/**
 * Carrega e exibe os dados de formação (cursos) no DOM.
 */
export async function loadTraining() {
	const coursesContainer = document.getElementById('courses__items');
	if (!coursesContainer) {
		console.error("Elemento com ID 'courses__items' não encontrado no DOM.");
		return;
	}

	try {
		const response = await fetch('/assets/data/courses.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const trainingData = await response.json();

		trainingData.forEach(item => {
			const courseDiv = document.createElement('div');
			courseDiv.classList.add('course-item');
			courseDiv.classList.add(`${item.type}`);

			courseDiv.innerHTML = `
                <h5>${item.titration}</h5>
                <h4>${item.name}</h4>
                <p>${item.institution} - ${item.campus}</p>
                <p>${item.start_date} - ${item.end_date}</p>
            `;
			coursesContainer.appendChild(courseDiv);
		});
	} catch (error) {
		console.error('Erro ao carregar os dados de formação: ', error);
		coursesContainer.innerHTML = `<p class="placeholder-content">Não foi possível carregar os dados de formação.</p>`;
	}
}
