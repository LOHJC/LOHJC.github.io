
"use strict"

let content = document.getElementById("content");
let navbar = document.getElementById("navbar");
content.style.display = "none";
navbar.style.visibility = "hidden";

//set footer
document.getElementsByTagName("footer")[0].innerHTML = "Created by <b>Loh Jia Chiew</b>";

//get webpage width and height (responsive)
let window_w = window.innerWidth;
let window_h = window.innerHeight;
console.log("Window width: ", window_w);
console.log("Window height: ", window_h);

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

//use sessionStorage to set favicon and theme
if (current_favicon.getAttribute("href") == "#") //favicon in html not set
{
	//check if sessionStorage has favicon
	if (typeof(sessionStorage["favicon"]) != 'undefined')
	{
		console.log("GOT favicon in sessionStorage");
		console.log(sessionStorage["favicon"]);
	}
	
	else
	{
		console.log("NO favicon in sessionStorage");
		sessionStorage["favicon"] = "favicon-dark.ico";
	}
	
	current_favicon.href = "../" + sessionStorage["favicon"];
}

if (current_theme.getAttribute("href") == "#") //theme in html not set
{
	//check if sessionStorage has theme
	if (typeof(sessionStorage["theme"]) != 'undefined')
	{
		console.log("GOT theme in sessionStorage");
		console.log(sessionStorage["theme"]);
	}
	
	else
	{
		console.log("NO theme in sessionStorage");
		sessionStorage["theme"] = "dark-theme.css";
	}
	
	current_theme.href = "../"+sessionStorage["theme"];
}


let theme_name = current_theme.getAttribute("href")

let theme_changer_static = document.querySelector(".theme-changer-static");
let static_style = theme_changer_static.style;

let theme_changer_moving = document.querySelector(".theme-changer-moving");
let moving_style = theme_changer_moving.style;

//if it is dark-theme, selected dark
if (current_theme.getAttribute("href") == "../dark-theme.css")
{
	static_style.backgroundColor = "var(--white)";
	moving_style.backgroundColor = "var(--dark-blue)";
	moving_style.transform="translate(125%, -50%)";
}
	
//if it is light theme, selected dark
else if (current_theme.getAttribute("href") == "../light-theme.css")
{
	static_style.backgroundColor = "var(--navy-blue)";
	moving_style.backgroundColor = "var(--baby-blue2)";
	moving_style.transform="translate(-225%, -50%)";
}

function change_theme()
{
	if (current_theme.getAttribute("href") == "../dark-theme.css" && current_favicon.getAttribute("href") == "../favicon-dark.ico")
	{
		//console.log("changed to light-theme");
		current_favicon.href = "../favicon-light.ico";
		current_theme.href = "../light-theme.css";
		sessionStorage["favicon"] = "favicon-light.ico";
		sessionStorage["theme"] = "light-theme.css";
	}

	else if(current_theme.getAttribute("href") == "../light-theme.css" && current_favicon.getAttribute("href") == "../favicon-light.ico")
	{
		//console.log("changed to dark-theme");
		current_favicon.href = "../favicon-dark.ico";
		current_theme.href = "../dark-theme.css";
		sessionStorage["favicon"] = "favicon-dark.ico";
		sessionStorage["theme"] = "dark-theme.css";
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
	if (theme_name == "../dark-theme.css")
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
	else if (theme_name == "../light-theme.css")
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
	location.href = "../index.html";
}

function projects_button_clicked()
{
	location.href = "../projects.html";
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


