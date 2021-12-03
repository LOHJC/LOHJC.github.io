
"use strict"

//hide the content and show the loading symbol (show the content once windows done loading)
let content = document.getElementById("content");
//let loader = document.getElementsByClassName("loader")[0]
let navbar = document.getElementById("navbar");
content.style.display = "none";
navbar.style.visibility = "hidden";
//loader.style.display = "inline";

//get the name of html page, and set the title
let filename = location.href.split("/").slice(-1)
//console.log(filename)

//show the projects here
if(filename == "projects.html")
{
	let projects_info = new Map();
	//projects_info.set("sample","This is a sample");
	projects_info.set("[SpaceGen] The Trail to Mars Can you keep your crew alive","An educational game which targets at 10 – 14 middle schoolers to teach them the risks and hazards faced during human spaceflights.");
	projects_info.set("Water Quality Testing Device by using sensors and image processing techniques","A water quality testing device which uses sensors and camera to obtain the water quality data. The data will then be translated to useful information and saved in the device itself and the cloud storage.");
	projects_info.set("Swiftlet Detection with Computer Vision and Machine Learning (Swiftlet Surveillance System)","A swiftlet detection system by using image processing techniques and support vector machine (SVM). The swiftlet detection system contains a server, several client cameras, and a web-based user interface. ");

	let projects_titles = Array.from(projects_info.keys());
	let projects_descriptions = Array.from(projects_info.values());
	//console.log(projects_info.keys())
	//console.log(projects_info.size)
	
	let items_per_row = 4;
	let current_item_index = 0;
	let total_row = Math.ceil(projects_info.size/items_per_row);
	let projects_table = document.getElementById("projects-table");
	//console.log("total_row:" + total_row)
	for (let i=0; i<total_row; i++)
	{
		let tr_tag = document.createElement("tr");
		if (current_item_index < projects_info.size)
		{
			//console.log("here")
			let check_index = 0;
			for (let j=check_index; check_index < items_per_row; j++)
			{
				let td_tag = document.createElement("td");
				td_tag.classList.add("card");
				
				let a_tag = document.createElement("a");
				if (projects_titles[current_item_index])
				{
					a_tag.href = "./project_files/"+projects_titles[current_item_index]+".html";
					
					let td_image = document.createElement("img");
					td_image.onerror = function(){td_image.src = "./project_files/no_preview_image.png";};
					td_image.title = projects_titles[current_item_index];
					td_image.src = "./project_files/"+projects_titles[current_item_index]+".png";
					td_image.width = 100;
					td_image.height = 100;
					
					let td_title_tag = document.createElement("p");
					td_title_tag.classList.add("project-title");
					let td_title = document.createTextNode(projects_titles[current_item_index]);
					
					let td_description_tag = document.createElement("p");
					td_description_tag.classList.add("project-description");
					let td_description = document.createTextNode(projects_descriptions[current_item_index]);
					
					td_title_tag.appendChild(td_title);
					td_description_tag.appendChild(td_description);
					
					a_tag.appendChild(td_image);
					a_tag.appendChild(td_title_tag);
					
					td_tag.appendChild(a_tag);
					td_tag.appendChild(td_description_tag);
					
					tr_tag.appendChild(td_tag);
					//console.log(current_item_index);
					//console.log(check_index);
				}
				current_item_index ++;
				check_index ++;
				
			}
		}
		projects_table.appendChild(tr_tag);
	}
	
	//console.log(projects_table);
}

if (filename == "index.html")
{
	document.title = "Home | " + document.title;
}

else if (filename == "projects.html")
{
	document.title = "Projects | " + document.title;
}
//set footer
document.getElementsByTagName("footer")[0].innerHTML = "Created by <b>Loh Jia Chiew</b>";

//get webpage width and height (responsive)
let window_w = window.innerWidth;
let window_h = window.innerHeight;
//console.log("Window width: ", window_w);
//console.log("Window height: ", window_h);

window.onresize = showWindowSize;
function showWindowSize()
{
	window_w = window.innerWidth;
	window_h = window.innerHeight;
	
	//console.log("Window width: ", window_w);
	//console.log("Window height: ", window_h);
}

//set the theme and favicon for website
let current_favicon = document.getElementById("favicon-link");
let current_theme = document.getElementById("theme-link");
let toggle_button = document.getElementById("theme-change-button");

if (typeof(sessionStorage["favicon"]) != 'undefined')
{
	//console.log("GOT favicon in sessionStorage");
	//console.log(sessionStorage["favicon"]);
}

else
{
	//console.log("NO favicon in sessionStorage");
	sessionStorage["favicon"] = "favicon-dark.ico";
}	
current_favicon.href = sessionStorage["favicon"];

//check if sessionStorage has theme
if (typeof(sessionStorage["theme"]) != 'undefined')
{
	//console.log("GOT theme in sessionStorage");
	//console.log(sessionStorage["theme"]);
}

else
{
	//console.log("NO theme in sessionStorage");
	sessionStorage["theme"] = "dark-theme.css";
}
current_theme.href = sessionStorage["theme"];


let theme_name = current_theme.getAttribute("href")

let theme_changer_static = document.querySelector(".theme-changer-static");
let static_style = theme_changer_static.style;

let theme_changer_moving = document.querySelector(".theme-changer-moving");
let moving_style = theme_changer_moving.style;

//if it is dark-theme, selected dark
if (current_theme.getAttribute("href") == "dark-theme.css")
{
	static_style.backgroundColor = "var(--white)";
	moving_style.backgroundColor = "var(--dark-blue)";
	moving_style.transform="translate(125%, -50%)";
}
	
//if it is light theme, selected dark
else if (current_theme.getAttribute("href") == "light-theme.css")
{
	static_style.backgroundColor = "var(--navy-blue)";
	moving_style.backgroundColor = "var(--baby-blue2)";
	moving_style.transform="translate(-225%, -50%)";
}

function change_theme()
{
	if (current_theme.getAttribute("href") == "dark-theme.css" && current_favicon.getAttribute("href") == "favicon-dark.ico")
	{
		//console.log("changed to light-theme");
		current_favicon.href = "favicon-light.ico";
		current_theme.href = "light-theme.css";
		sessionStorage["favicon"] = current_favicon.getAttribute("href");
		sessionStorage["theme"] = current_theme.getAttribute("href");
	}

	else if(current_theme.getAttribute("href") == "light-theme.css" && current_favicon.getAttribute("href") == "favicon-light.ico")
	{
		//console.log("changed to dark-theme");
		current_favicon.href = "favicon-dark.ico";
		current_theme.href = "dark-theme.css";
		sessionStorage["favicon"] = current_favicon.getAttribute("href");
		sessionStorage["theme"] = current_theme.getAttribute("href");
	}
	
}

//the theme change animation play when theme change
function change_theme_animation()
{
	let theme_name = current_theme.getAttribute("href")
	//console.log(current_theme);
	//console.log("current theme: ",theme_name);
	
	let theme_changer_static = document.querySelector(".theme-changer-static");
	let static_style = theme_changer_static.style;
	
	let theme_changer_moving = document.querySelector(".theme-changer-moving");
	let moving_style = theme_changer_moving.style;
	
	//if it is dark-theme, left to right
	if (theme_name == "dark-theme.css")
	{
		static_style.animation = 'none';
		theme_changer_static.offsetHeight; /* trigger reflow */
		static_style.animation = "theme-changer-color-change-left-to-right 0.25s";
		static_style.animationFillMode  = "forwards";
		
		moving_style.animation = 'none';
		theme_changer_moving.offsetHeight; /* trigger reflow */
		moving_style.animation = "theme-changer-sliding-left-to-right 0.25s";
		moving_style.animationFillMode  = "forwards";
	}
	
	//if it is light theme, right to left 
	else if (theme_name == "light-theme.css")
	{
		static_style.animation = 'none';
		theme_changer_static.offsetHeight; /* trigger reflow */
		static_style.animation = "theme-changer-color-change-right-to-left 0.25s";
		static_style.animationFillMode  = "forwards";
		
		moving_style.animation = 'none';
		theme_changer_moving.offsetHeight; /* trigger reflow */
		moving_style.animation = "theme-changer-sliding-right-to-left 0.25s";
		moving_style.animationFillMode  = "forwards";
	}
}

toggle_button.addEventListener("click", change_theme);
toggle_button.addEventListener("click", change_theme_animation);



//set the navbar click action current page
let home_button = document.getElementById("home-button");
let projects_button = document.getElementById("projects-button");

function home_button_clicked()
{
	location.href = "index.html";
}

function projects_button_clicked()
{
	location.href = "projects.html";
}

home_button.addEventListener("click", home_button_clicked);
projects_button.addEventListener("click", projects_button_clicked);

//show the content once windows done loading
window.onload = function()
{
	content.style.display = "inline";
	navbar.style.visibility = "visible";
	//loader.style.display = "none";
}


