const skillSect = document.querySelector("#skills");
const skillContainer = document.querySelector(".skill-container");
const aboutInfo = document.querySelector(".about-info");
const projectContainer = document.querySelector(".project-container");

console.log(projectContainer);

async function displaySkill() {
	try {
		let response = await fetch("skill/info.json");
		let skills = await response.json();

		for (let i = 0; i < skills.length; i++) {
			skillContainer.innerHTML =
				skillContainer.innerHTML +
				`<div class="skill-data">
                <div class="skill-name">
                    <img class="svg-size" src="${skills[i].imgSrc}" alt="">
                    <Span>${skills[i].title}</Span>
                </div>
                <div class="skill-bar"></div>
            </div>`;
		}
	} catch (error) {
		console.error("error occured:", error);
	}
}

async function about() {
	try {
		let response = await fetch("about/info.json");
		let intro = await response.json();

		let paragraphs = intro.introduction
			.map((para) => `<p>${para}</p>`)
			.join("<br>");
		aboutInfo.innerHTML = paragraphs;
	} catch (error) {
		console.error("error occurred:", error);
	}
}

async function displayProject() {
	try {
		let response = await fetch("project/info.json");
		let project = await response.json();

		console.log(project);

		for (let i = 0; i < project.length; i++) {
			projectContainer.innerHTML += `	
                <div class="project-img ">
                    <img src="${project[i].imgSrc}" alt="">
                </div>
                <div class="project-info roledown">
                    <div class="project-heading">
                        <h2>${project[i].heading}</h2>
                    </div>
                    <div class="project-description">
                        <p>${project[i].description}</p>
                    </div>
                    <div class="project-btn">
                       
						<a href="${project[i].demoLink}" target="_blank">
						<button class="fill">Live Demo
						</button>
						</a>
                        
						<a href="${project[i].code}"  target="_blank">
						<button class="fill">Source Code
						</button>
						</a>
                    </div>
                </div>`;
		}
	} catch (error) {
		console.error("error occurred:", error);
	}
}

displayProject();

about();

displaySkill();

// header elements change color on scroll

document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll("section");
	const navLinks = document.querySelectorAll(".nav-items a");

	function updateActiveLink() {
		let closestSection = null;
		let minDistance = Number.MAX_VALUE;
		const viewportCenter = window.innerHeight / 2;

		sections.forEach((section) => {
			const rect = section.getBoundingClientRect();
			const sectionCenter = rect.top + rect.height / 2;
			const distance = Math.abs(viewportCenter - sectionCenter);

			if (distance < minDistance) {
				minDistance = distance;
				closestSection = section;
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (
				closestSection &&
				link.getAttribute("href") === `#${closestSection.id}`
			) {
				link.classList.add("active");
			}
		});
	}

	updateActiveLink();
	window.addEventListener("hashchange", updateActiveLink);
	window.addEventListener("scroll", updateActiveLink);
});
3;

// AFTER REFRESH ON HOME PAGE

document.addEventListener("DOMContentLoaded", () => {
	// Check if the current URL hash is not '#home'
	if (window.location.hash !== "#home") {
		// Set the hash to '#home' to navigate to the home section
		window.location.hash = "#home";
	}

	// Scroll to the top of the page to avoid any visual glitch
	window.scrollTo(0, 0);
});

// for typing effect

var typeData = new Typed(".role", {
	strings: ["Programmer.", "Web Developer.", "Front-End Developer"],
	loop: true,
	typeSpeed: 100,
	backSpeed: 70,
	backDelay: 1000,
});

// Animation

document.addEventListener("DOMContentLoaded", function () {
	// Function to check if an element is in viewport
	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	// Function to add animation class when element is in viewport
	function addAnimationClassOnScroll(element, animationClass) {
		if (isInViewport(element)) {
			element.classList.add(animationClass);
		}
	}

	// Elements and their corresponding animation classes
	const elementsToAnimate = [
		{ selector: ".heading-1", animationClass: "heading-1" },
		{ selector: ".heading-2", animationClass: "heading-2" },
		{ selector: ".btn", animationClass: "btn" },
		{ selector: ".image img", animationClass: "image-animate" },
		{ selector: ".about-info", animationClass: "about-animate" },
		{ selector: ".skill-data", animationClass: "skill-animate" },
		{ selector: ".project-img", animationClass: "project-img-animate" },
		{ selector: ".project-info", animationClass: "project-info-animate" },
		{ selector: ".input-name", animationClass: "input-animate" },
		{ selector: ".input-email", animationClass: "input-animate" },
		{ selector: ".message", animationClass: "input-animate" },
	];

	// Scroll event listener
	window.addEventListener("scroll", function () {
		elementsToAnimate.forEach((item) => {
			const elements = document.querySelectorAll(item.selector);
			elements.forEach((element) => {
				addAnimationClassOnScroll(element, item.animationClass);
			});
		});
	});

	// Initial check in case elements are already in viewport on page load
	elementsToAnimate.forEach((item) => {
		const elements = document.querySelectorAll(item.selector);
		elements.forEach((element) => {
			addAnimationClassOnScroll(element, item.animationClass);
		});
	});
});

// Clear Contatact Form after submiting

document
	.getElementById("contact-form")
	.addEventListener("submit", function (event) {
		// Optionally, you can prevent the default form submission here if you want to handle the submission with JavaScript.
		// event.preventDefault();

		// Clear form fields after submission
		setTimeout(function () {
			document.getElementById("contact-form").reset();
		}, 100); // Delay to ensure form data is submitted before resetting
	});
