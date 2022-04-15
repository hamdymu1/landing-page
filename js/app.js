/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

//Define Global Variables
const navbar = document.querySelector('.navbar__menu ul');
const fragment = document.createDocumentFragment();
//End Global Variables

//Start Helper Functions
// Adding New Section
function addNewSection(element, elementId, header) {
	const main = document.querySelector('main');
	const newSection = document.createElement(`${element}`);
	newSection.setAttribute('id', `${elementId}`);
	newSection.innerHTML = `
		<div class="landing__container">
			<h2>${header}</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum
				metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean
				aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus
				imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac
				tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi
				aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus
				imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam
				porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et
				elementum non, faucibus vitae elit. Integer nec libero venenatis libero
				ultricies molestie semper in tellus. Sed congue et odio sed euismod.
			</p>

			<p>
				Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
				gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras
				eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur
				porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor
				mollis non.
			</p>
		</div>`;
	fragment.appendChild(newSection);
	main.appendChild(fragment);
}
// Creating Navbar List Items
function createNavItems() {
	const sections = document.querySelectorAll('section');
	for (let i = 1; i <= sections.length; i++) {
		const section = document.createElement('li');
		const sectionLink = document.createElement('a');
		sectionLink.href = '#section' + i;
		sectionLink.innerText = 'Section ' + i;
		section.classList.add('section' + i);
		section.appendChild(sectionLink);

		fragment.appendChild(section);
	}
	navbar.appendChild(fragment);
}

// Check if page is scrolled to show/hide navbar
function Scrolled() {
	window.addEventListener('scroll', () => {
		navbar.style.display = 'flex';
		const currentPosition = document.body.scrollTop;
		setTimeout(() => {
			if (
				document.body.scrollTop === currentPosition &&
				document.body.scrollTop !== 0
			) {
				navbar.style.display = 'none';
			}
		}, 3000);
	});
}

// Add active to navabr li && section header
function addActiveClass() {
	// Add class 'active' to section when near top of viewport
	window.addEventListener('scroll', () => {
		let current = '';
		const sections = document.querySelectorAll('section');
		const navbarList = document.querySelectorAll('li');
		const headersList = document.querySelectorAll('section div h2');

		// Make sure section is near page top
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (window.scrollY >= sectionTop - sectionHeight / 3) {
				current = section.getAttribute('id');
			}
		});

		// Remove old 'active' and add new one to navbar element
		navbarList.forEach((item) => {
			item.classList.remove('active');
			if (item.classList.contains(current)) {
				item.classList.add('active');
			}
		});

		// Remove old 'active' and add new one to section header
		headersList.forEach((header) => {
			header.classList.remove('active-header');
			const immediateParent = header.parentElement;
			const parent = immediateParent.parentElement;
			if (parent.id === current) {
				header.classList.add('active-header');
			}
		});
	});
}

// Scroll to section when click on the navbar
function liClicked() {
	document.querySelectorAll('a[href^="#"]').forEach((item) => {
		item.addEventListener('click', function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
			});
		});
	});
}
//End Helper Functions

//Begin Main Functions

// Add new section
addNewSection('section', 'section4', 'Section 4');

// build the nav
createNavItems();

// Add active
addActiveClass();

// Scroll to anchor ID using scrollTO event
liClicked();

// Hide navbar when not scrolling
Scrolled();
/**
 * End Main Functions
 */
