"use strict"

function setHeaderFooterFontSize()
{
	//get header and footer
	let header = document.querySelector("header");
	let footer = document.querySelector("footer");

	//get header and footer height and width
	let header_height = header.offsetHeight;
	let header_width = header.offsetWidth;
	let footer_height = footer.offsetHeight;
	let footer_width = footer.offsetWidth;

	//set header text and footer text fit
	let header_scale = 7;
	let footer_scale = 2.5;
	
	if (header_width > header_height)
		header.style.fontSize = header_scale+"vh";
	else
		header.style.fontSize = header_scale+"vw";
	
	if (footer_width > footer_height)
		footer.style.fontSize = footer_scale+"vh";
	else
		footer.style.fontSize = footer_scale+"vw";
}

function setNavBarFontSize()
{
	let nav_buttons = document.querySelector("nav").querySelector("table").querySelector("tr").querySelectorAll("td");
	let nav_buttons_len = nav_buttons.length;
	
	let text_scale = 3;
	
	for (let i=0; i<nav_buttons_len; i++)
	{
		let nav_button = nav_buttons[i].querySelector("button");
		let nav_button_height = nav_button.offsetHeight;
		let nav_button_width = nav_button.offsetWidth;
		
		if (nav_button_width > nav_button_height)
			nav_button.style.fontSize = text_scale+"vh";
		else
			nav_button.style.fontSize = text_scale+"vw";
	}
}

function setContentFontSize()
{
	//set title
	let title_div = document.getElementById("content_title")
	let title_div_height = title_div.offsetHeight;
	let title_div_width = title_div.offsetWidth;
	
	let title_scale = 5.5;
	
	if (title_div_width > title_div_height)
		title_div.style.fontSize = title_scale+"vh";
	else
		title_div.style.fontSize = title_scale+"vw";
	
	//set description
	let description_div = document.getElementById("content_description")
	let description_div_height = description_div.offsetHeight;
	let description_div_width = description_div.offsetWidth;
	
	let description_scale = 3.5;
	
	if (description_div_width > description_div_height)
	{
		description_div.style.fontSize = description_scale+"vh";
		description_div.style.padding = "0 " + description_scale+"vh";
	}
	else
	{
		description_div.style.fontSize = description_scale+"vw";
		description_div.style.padding = "0 " + description_scale+"vw";
	}
}

function setCardDescriptionFontSize()
{
	let card_description = document.getElementById("card_description");
	
	if (card_description)
	{
		let card_description_height = card_description.offsetHeight;
		let card_description_width = card_description.offsetWidth;
		
		let scale=3;
		
		if (card_description_width > card_description_height)
		{
			card_description.style.fontSize = scale+"vh";
		}
		else
		{
			card_description.style.fontSize = (scale)+"vw";
		}
	}
}

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
let projects_link = ["https://lohjc.github.io/SpaceGen/", "", ""];

let projects_titles = Array.from(projects_info.keys());
let projects_descriptions = Array.from(projects_info.values());


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
	
	title.innerHTML = "ABOUT ME";
	description.innerHTML = "A programming enthusiast who knows several programming languages, \
	such as Python, C/C++, HTML&CSS&js.";
	
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
	
	setCardDescriptionFontSize();
	
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

//if the windows is resized
window.onresize = () => {
	setHeaderFooterFontSize();
	setNavBarFontSize();
	setContentFontSize();
	setCardDescriptionFontSize();
};

//initial call
setHeaderFooterFontSize();
setNavBarFontSize();
setContentFontSize();
setCardDescriptionFontSize();