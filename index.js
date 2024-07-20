"use strict"


let projects = [];
let selectedTags = []

async function fetchHome() {
    try {
        const response = await fetch('home.txt');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const home = await response.text();
        displayHome(home);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayHome(home) {
    const contentDiv = document.getElementById('home');
    const lines = home.split('\r\n'); // Split the text by newline
    lines.forEach(line => {
		if (line == "")
			return;
        const lineElement = document.createElement('p');
		lineElement.classList.add("text-start");
        // lineElement.style.textIndent = "5%";
        // lineElement.style.textAlign = "justify";
        lineElement.innerText = line;
        contentDiv.appendChild(lineElement);
    });
}

fetchHome();

async function fetchProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        projects = data.projects;
        displayProjects(data.projects);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projects');
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

function getLinkIcon(href, elem) {
    if (href.includes("drive.google.com")) {
        elem.classList.add("fa-brands","fa-google-drive");

    } else if (href.includes("youtu.be")) {
        elem.classList.add("fa-brands","fa-youtube");

    } else if (href.includes("github.com")) {
        elem.classList.add("fa-brands","fa-github");

    } else if (href.includes("github.io")) {
        elem.classList.add("fa-solid","fa-file");

    } else {
        elem.classList.add("fa-solid","fa-link");

    }

    elem.classList.add("mx-1");

}

function createProjectCard(project) {

	const cardContainer = document.createElement('div');
    cardContainer.classList.add("col-md-4","col-sm-6","mb-3","mt-3");

    const card = document.createElement('div');
    card.classList.add("card","border-2","pt-3");
	card.style.height = "100%";

	const img = document.createElement('img');
	img.classList.add("rounded-3","mx-auto")
	if (project.image != "")
		img.src = project.image;
	else
		img.src = "./images/no-preview-img.png"
	img.title = project.name;
	img.style.width = '80px';
	img.style.height = '80px';

	const cardBody = document.createElement('div');
	cardBody.classList.add("card-body");

    const title = document.createElement('div');
    title.classList.add('card-title',"fw-bold","lh-1","fs-6","m-auto","d-flex","justify-content-center");
    // title.style.textAlign = "justify";
    title.innerText = project.name;
	title.style.height = "50px";
	title.style.overflow = "auto";

    const year = document.createElement('small');
    year.classList.add("text-muted");
    year.innerText = project.year;
	year.style.fontSize = ".65em";
	year.style.padding = ".35em .35em";
    title.appendChild(year);

    const description = document.createElement('div');
    description.classList.add('card-text',"text-muted","lh-1","border","rounded","px-3","py-1");
    description.innerHTML = "<small>"+project.description+"</small>";
    // description.style.textAlign = "justify";
	description.style.height = "80px";
	description.style.overflow = "auto";

    const links = document.createElement('div');
	project.links.forEach(link => {
        const linkContainer = document.createElement('span');
        const linkIcon = document.createElement('span');
        const linkHref = document.createElement('a');
        getLinkIcon(link,linkIcon);
        linkHref.href = link;
        linkHref.target = "_blank";
        linkHref.rel="noopener noreferrer";
        linkHref.classList.add("nav-link");

        linkHref.appendChild(linkIcon);
        linkContainer.appendChild(linkHref);
        
        links.appendChild(linkContainer);
    });
    links.classList.add("d-flex","justify-content-center","align-items-center")
	// links.style.height = "50px";
	links.style.overflow = "auto";

	const tags = document.createElement('span');
	project.tags.forEach(tag => {
        const tagBadge = document.createElement('button');
        tagBadge.name = tag;
		tagBadge.classList.add("btn","badge","text-bg-secondary","m-1","rounded-pill");
		tagBadge.innerText = tag;
        tagBadge.onclick = () => {
            toggleTag(tag);
        }
        tags.appendChild(tagBadge);
    });

	card.appendChild(img);

    cardBody.appendChild(title);
    cardBody.appendChild(description);
	cardBody.appendChild(links);
	cardBody.appendChild(tags);

	card.appendChild(cardBody);

	cardContainer.appendChild(card);

    return cardContainer;
}

fetchProjects();

function hideInfo() {
	const information = document.getElementById("info");
	const children = information.children;
	for (let i = 0; i < children.length; i++) {
		children[i].style.visibility = "hidden";
		children[i].style.display = "none";
	}
}

function showHome() {
	hideInfo();
	document.getElementById("home").style.visibility = "visible";
	document.getElementById("home").style.display = "";
}

function showProjects() {
	hideInfo();
    document.getElementById("projects").innerHTML = "";
    filterItems();
    // displayProjects(projects);
	document.getElementById("projects").style.visibility = "visible";
	document.getElementById("projects").style.display = "";
}

function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
        clearFilter(tag);
        selectedTags = selectedTags.filter(t => t !== tag);
    } else {
        addFilter(tag);
        selectedTags.push(tag);
    }
    filterItems();
}

function filterItems() {
    let filteredItems;
    if (selectedTags.length === 0) {
        filteredItems = projects;
        document.getElementById("filter").style.visibility = "hidden";
        document.getElementById("filter").style.display = "none";
    }
    else {
        filteredItems = projects.filter(project =>
            selectedTags.every(tag => project.tags.includes(tag))
        );
        document.getElementById("filter").style.visibility = "visible";
        document.getElementById("filter").style.display = "";
    }
    
    document.getElementById("projects").innerHTML = "";
    displayProjects(filteredItems);
}

function addFilter(tag) {
    console.log(selectedTags);
    if (selectedTags.includes(tag)) {
        //do nothing
    } else {
        //add the tag
        console.log("adding:",tag)
        const tagBadgeContainer = document.getElementById("tag-badges")
        
        const newTagBadge = document.createElement("span");
        newTagBadge.classList.add("badge","text-bg-secondary","my-3","mx-1","rounded-pill","position-relative");
        newTagBadge.id = "tag-"+tag;
        newTagBadge.innerText = tag;

        const closeButton = document.createElement("button");
        closeButton.title = "close";
        closeButton.type = "button";
        closeButton.classList.add("position-absolute","top-0","start-100","translate-middle","text-bg-danger","border","border-light","rounded-circle","d-flex","justify-content-center","align-items-center");
        closeButton.style.width = "20px";
        closeButton.style.height = "20px";
        closeButton.innerText = "×";
        closeButton.onclick = () => {
            clearFilter(tag);
        };
        newTagBadge.appendChild(closeButton);

        tagBadgeContainer.appendChild(newTagBadge);
    }

}

function clearAllFilter() {
    selectedTags.forEach(t => clearFilter(t));
    selectedTags = [];
    filterItems();
}

function clearFilter(tag) {
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
        document.getElementById("tag-"+tag).remove();
    }
    filterItems();
}

showHome();
// showProjects();