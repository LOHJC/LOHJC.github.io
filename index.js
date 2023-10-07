"use strict"


function triggerFadeInAnimation(item)
{
	item.style.animation = "none";
	setTimeout( ()=> {
		item.style.animation = "fade_in_effect 1.5s";
		item.style.opacity = 1;}, 1);
}

function triggerFadeOutAnimation(item)
{
	item.style.opacity = 0;
	item.style.animation = "none";
	setTimeout( ()=> {item.style.animation = "fade_out_effect 0.01s"}, 1);
}

//shows the projects here
let projects_info = new Map();
let current_project_index = 0;

projects_info.set("[SpaceGen] The Trail to Mars Can you keep your crew alive","An educational game which targets at 10 – 14 middle schoolers to teach them the risks and hazards faced during human spaceflights.");
projects_info.set("Water Quality Testing Device by using sensors and image processing techniques","A water quality testing device which uses sensors and camera to obtain the water quality data. The data will then be translated to useful information and saved in the device itself and the cloud storage.");
projects_info.set("Swiftlet Detection with Computer Vision and Machine Learning (Swiftlet Surveillance System)","A swiftlet detection system by using image processing techniques and support vector machine (SVM). The swiftlet detection system contains a server, several client cameras, and a web-based user interface. ");
projects_info.set("TODOLOH","A todo list system where user can create a todo list and upload a current todo list");

let projects_link = ["https://lohjc.github.io/SpaceGen/", "", "", "https://lohjc.github.io/todoloh/"];

let projects_titles = Array.from(projects_info.keys());
let projects_descriptions = Array.from(projects_info.values());

//preload the images
let project_images = [];
let load_images_index = 0;
for (let i=0; i<projects_titles.length; i++)
{
	project_images.push("./project_files/"+projects_titles[i]+".png");
}
project_images.push("./project_files/no_preview_image.png");

let temp_img = new Image();
temp_img.src = project_images[load_images_index];
temp_img.onload = () => {
	if (load_images_index < project_images.length - 1)
	{
		load_images_index += 1
		temp_img.src = project_images[load_images_index];
	}
}

function setCardData()
{
	let card_image = document.getElementById("card_image");
	let card_description = document.getElementById("card_description");
	
	card_image.title = projects_titles[current_project_index];
	card_image.src = "./project_files/"+projects_titles[current_project_index]+".png";
	
	let card_link = projects_link[current_project_index];
	if (card_link == "")
		card_link = "./project_files/"+projects_titles[current_project_index]+".html"
	card_description.innerHTML = "<a target='_blank' href='"+card_link+"'>"+projects_titles[current_project_index]+"</a>\
	<div>"+projects_descriptions[current_project_index]+"</div>";
}

function cardLeftPressed()
{
	let card = document.getElementById("card");
	let animation_time = 0.5;//s
	
	current_project_index += 1;
	if (current_project_index >= projects_info.size)
		current_project_index = 0;
	
	card.style.animation = "none";
	setTimeout( () => {
		card.style.animation = "card_to_left_fade_out "+animation_time+"s";
		setTimeout( () => {
			card.style.animation = "card_from_right_fade_in "+animation_time+"s";
			setCardData();
		},1);
	},1);
}

function cardRightPressed()
{
	let card = document.getElementById("card");
	let animation_time = 0.5;//s
	
	current_project_index -= 1;
	if (current_project_index < 0)
		current_project_index = projects_info.size - 1;
	
	card.style.animation = "none";
	setTimeout( () => {
		card.style.animation = "card_to_right_fade_out "+animation_time+"s";
		setTimeout( () => {
			card.style.animation = "card_from_left_fade_in "+animation_time+"s";
			setCardData();
		},1);
	},1);
	
}

function aboutMe()
{
	let title = document.getElementById("content_title");
	let description = document.getElementById("content_description");
	
	triggerFadeOutAnimation(title);
	triggerFadeOutAnimation(description);

	let content = document.createElement("p");
	content.style.fontSize = "90%";
	content.style.margin = "0% 3%";
	
	title.innerHTML = "ABOUT ME";
	description.innerHTML = "";
	content.innerHTML = "I am a passionate programmer fluent in the languages of code and captivated by the wonders of Image Processing, Computer Vision, and Artificial Intelligence.<br/><br/>\
	With a diverse skill set in various programming languages, I thrive on transforming ideas into reality and crafting elegant solutions to complex problems. I believe that by leveraging technology, we can address some of the most pressing challenges of our time.";
	description.appendChild(content);

	triggerFadeInAnimation(title);
	triggerFadeInAnimation(description);
	
}

function projects()
{
	let title = document.getElementById("content_title");
	let description = document.getElementById("content_description");
	
	triggerFadeOutAnimation(title);
	triggerFadeOutAnimation(description);
	
	title.innerHTML = "PROJECTS";
	description.innerHTML = "";
	
	//create the cards and set the initial project shown
	let card_content = document.createElement("div");
	card_content.id = "card_content";
	let left_arrow = document.createElement("button");
	left_arrow.innerHTML = "<span><</span>";
	left_arrow.onclick = () => {cardLeftPressed()};
	let right_arrow = document.createElement("button");
	right_arrow.innerHTML = "<span>></span>";
	right_arrow.onclick = () => {cardRightPressed()};
	let card = document.createElement("div");
	card.id = "card";
	let card_image = document.createElement("img");
	card_image.id = "card_image";
	card_image.title = projects_titles[current_project_index];
	card_image.src = "./project_files/"+projects_titles[current_project_index]+".png";
	card_image.onerror = () => {card_image.src = "./project_files/no_preview_image.png"};
	let card_description = document.createElement("div");
	let card_link = projects_link[current_project_index];
	if (card_link == "")
		card_link = "./project_files/"+projects_titles[current_project_index]+".html"
	card_description.innerHTML = "<a target='_blank' href='"+card_link+"'>"+projects_titles[current_project_index]+"</a>\
	<div>"+projects_descriptions[current_project_index]+"</div>";
	card_description.id = "card_description";
	
	card.appendChild(card_image);
	card.appendChild(card_description);
	
	card_content.appendChild(left_arrow);
	card_content.appendChild(card);
	card_content.appendChild(right_arrow);
	
	description.appendChild(card_content);
	
	triggerFadeInAnimation(title);
	triggerFadeInAnimation(description);
}

function contacts()
{
	let title = document.getElementById("content_title");
	let description = document.getElementById("content_description");
	
	triggerFadeOutAnimation(title);
	triggerFadeOutAnimation(description);
	
	title.innerHTML = "CONTACTS";
	description.innerHTML = "<div>Email: <a href='mailto:jiachiewloh@gmail.com' target='_blank'>jiachiewloh@gmail.com</a></div>\
	<div>LinkedIn: <a href='https://www.linkedin.com/in/jia-chiew-loh-287195181/' target='_blank'>Jia Chiew Loh</a></div>";	
	
	triggerFadeInAnimation(title);
	triggerFadeInAnimation(description);
}
