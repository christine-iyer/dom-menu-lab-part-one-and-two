alert("js rocks Yes!");
// Task 5.0 Update the menuLinksarray in script.js to this:
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];;
// Task 1.0 Select and cache the <main>element in a variable named mainEl.
var mainEl = document.querySelector('main');


// Task 1.1 
//Set the background color of mainEl to the value stored in the --main-bgCSS custom property.
mainEl.style.backgroundColor = 'var(--main-bg)';

// Task 1.2
// Set the content of mainElto <h1>SEI Rocks!</h1>.
mainEl.innerHTML = '<h1>SEI Rocks! Just like it does at the HardRock cafe</h1>';

// Task 1.3
// Add a class of flex-ctr to mainEl.
mainEl.classList.add('flex-ctr');

// Task 2.0
// Select and cache the <nav id="top-menu">element in a variable named topMenuEl.
var topMenuEl = document.getElementById('top-menu');

// Task 2.1
// Set the height topMenuElelement to be 100%.
topMenuEl.style.height = '100%';

// Task 2.2
// Set the background color of topMenuElto the value stored in the --top-menu-bgCSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Task 2.3
// Add a class of flex-aroundto topMenuEl.
topMenuEl.classList.add('flex-around');

// Task 3.1 Iterate over the entire menuLinksarray and for each "link" object:



// menuLinks.forEach(function(aEl){
//   // step 1 add an href attribute 
//   let aEl = document.createElement('a');
//   // step 2 set its value set to the hrefproperty of the "link" object
//     aEl.setAttribute('href', link.href);
// //step 3 Set the new element's content to the value of the text property of the "link" object.
//   aEl.textContent = link.text;
//   // Append the new element to the topMenuElelement.
//   topMenuEl.appendChild(aEl)
// })


menuLinks.forEach(function(link){
    let aEl = document.createElement('a');
    aEl.setAttribute('href', link.href);
    aEl.textContent = link.text;
    topMenuEl.appendChild(aEl)
})

// Arthur's alternate solution to part 3
// var aboutEl = document.createElement('a')
// aboutEl.setAttribute('href', menuLinks[0].href);
// aboutEl.textContent = menuLinks[0].text;
// topMenuEl.appendChild(aboutEl);

//Task 4.0 Select and cache the <nav id="sub-menu">element in a variable named subMenuEl.

var subMenuEl = document.getElementById('sub-menu');


//Task 4.1 Set the height subMenuEl element to be 100%.
subMenuEl.style.height = '100%';

// Task 4.2 Set the background color of subMenuElto the value stored in the --sub-menu-bgCSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// Task 4.3
// Add the class of flex-aroundto the subMenuElelement.
subMenuEl.classList.add('flex-around');

// Task 4.4
// Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';

// Task 4.5
// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = '0';

// Task 5.1
// Select and cache the all of the <a>elements inside of topMenuEl in a variable named topMenuLinks.
var topMenuLinks = document.querySelectorAll('#top-menu a');

// Declare a global showingSubMenu variable and initialize it to false;
var showingSubMenu = 'false';

// Task 5.2
// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', function(evt) {
// The first line of code of the event listener function should call the event object's preventDefault()method.
  evt.preventDefault();
  // The second line of code function should immediately return if the element clicked was not an <a>element.
var link = evt.target;
// console.log the content of the <a>to verify the handler is working.
if(link.tagName !== 'A') return;
console.log(link.textContent);
// Progress Check
// Ensure that clicking ABOUT, CATALOG, etc. logs out about, catalog, etc. when a link is clicked.
// Clicking anywhere other than on a link should do nothing.
// Task 5.3 Next in the event listener, if the clicked <a>link has a class of active:
// Remove the activeclass from the clicked <a>element.
if (link.classList.contains('active')){
  link.classList.remove('active');
// Set the showingSubMenuto false.
showingSubMenu = 'false';
// Set the CSS top property of subMenuElto 0.
subMenuEl.style.top = '0';
// returnto exit the handler.
return;
}
// Task 5.4
// Next, the event listener should remove a class name of active from each <a>element in 
// topMenuLinks whether the activeclass exists or not.
// Hint: Removing a non-existent class from an element does not cause an error, so just remove it!
topMenuLinks.forEach(function(link){
  link.classList.remove('active')
});
// Task 5.5
// Next, the event listener should add a class name of active to the <a>element that was clicked.
link.classList.add('active');
// Task 5.6
// Set showingSubMenu to true if the clicked <a> element's "link" object within menuLinkshas 
// a subLinksproperty (all do, except for the "link" object for ABOUT), 
// otherwise, set it to false.
// Hint variable linkObj
var linkData = menuLinks.find(function(linkObj){
return linkObj.text === link.textContent;
});
showingSubMenu = 'subLinks' in linkData;
//Task 6.4 Not underestanding this. 
// If the ABOUT link is clicked, an <h1>about</h1>should be displayed.
if (!showingSubMenu) mainEl.innerHTML = '<h1>${link.textContent}</h1>';

//5.7a if showingSubMenu = 'true', build a sub menu function passing it to the 
//sub array for the clicked <a> element
if (showingSubMenu) {
  buildSubMenu(linkData.subLinks);
// 5.7b set the css <top> of subMenuEl to 100%
  subMenuEl.style.top = '100%';
//5.7c if showing submenu is false set the top property to 0.
} else {
  subMenuEl.style.top = '0%';
}
});


// Task 5.8
// Code the buildSubMenufunction so that it:
function buildSubMenu(subLinks){
// 5.8a Clears the contents of subMenuEl.
subMenuEl.innerHTML = '';
// Iterates over the subLinksarray passed as an argument; and for each "link" object:
subLinks.forEach(function(link) {
// Create an <a>element.
var linkEl = document.createElement('a');
// On the new element, add an hrefattribute with its value set to the hrefproperty of the "link" object.
linkEl.setAttribute('href', link.href);
// Set the new element's content to the value of the textproperty of the "link" object.
linkEl.textContent = link.text;
// Append the new element to the subMenuElelement.
subMenuEl.appendChild(linkEl);
});
}

// Task 6.0
// Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener('click', function(evt){
  // The first line of code of the event listener function should call the event 
  // object's preventDefault() method.
evt.preventDefault();
// The second line of code function should immediately return if the element clicked 
//was not an <a>element.
var link = evt.target;
if (link.tagName !== 'A') return 
  // console.logthe content of the <a>to verify the handler is working.
console.log(link.textContent);
// Task 6.1 Next, the event listener should set showingSubMenuto false.
showingSubMenu = false;
// Set the CSS topproperty of subMenuElto 0.
subMenuEl.style.top = '0';
// Task 6.2 remove the class name of activefrom each <a>element in 
//topMenuLinks- whether the activeclass exists or not.
topMenuLinks.forEach(function(link) {

  link.classList.remove('active');
  });
  // Task 6.3 Update the contents of mainElto the contents of the <a>element, 
// within an <h1>, clicked within subMenuEl.
mainEl.innerHTML = '<h1>${link.textContent}</h1>';

})

// Task 6.4
// If the ABOUT link is clicked, an <h1>about</h1>should be displayed.
// OK, so I have no idea how I could ever come close to doing 
//this without the solution
// Congrats!
