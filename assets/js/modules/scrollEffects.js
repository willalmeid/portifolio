/**
 * Inicializa a lógica do "scroll spy" para destacar o item de navegação ativo
 * e a sombra do cabeçalho ao rolar.
 */
export function initScrollSpy() {
	const sections = document.querySelectorAll('.main > section');
	const navItems = document.querySelectorAll('.nav-item');
	const header = document.querySelector('header');

	window.addEventListener('scroll', () => {
		const headerHeight = header ? header.offsetHeight : 60;
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
		let foundActive = false;

		for (let i = sections.length - 1; i >= 0; i--) {
			const section = sections[i];
			if (section) {
				const activationTriggerPoint = section.offsetTop - (headerHeight + 200); // Ajuste fino pode ser necessário
				if (scrollPosition >= activationTriggerPoint) {
					activeSectionIndex = i;
					foundActive = true;
					break;
				}
			}
		}

		if (!foundActive && sections.length > 0 && scrollPosition < sections[0].offsetTop - headerHeight) {
			activeSectionIndex = 0;
		} else if (!foundActive && sections.length > 0) {
			activeSectionIndex = sections.length - 1;
		}

		navItems.forEach(element => {
			element.classList.remove('active');
		});

		if (navItems[activeSectionIndex]) {
			navItems[activeSectionIndex].classList.add('active');
		}
	});
}

/**
 * Inicializa as animações de revelação de elementos usando a biblioteca ScrollReveal.
 */
export function initScrollRevealAnimations() {
	if (typeof ScrollReveal !== 'undefined') {
		ScrollReveal().reveal('#imagem-pessoal', {
			origin: 'left',
			duration: 3000,
			distance: '20%',
		});

		ScrollReveal().reveal('.hero-banner__content', {
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

		ScrollReveal().reveal('#section--courses', {
			origin: 'right',
			duration: 2000,
			distance: '20%',
		});
	} else {
		console.warn('A biblioteca ScrollReveal não foi encontrada. As animações não funcionarão.');
	}
}
