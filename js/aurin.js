let targetTag = document.querySelector('.blob');
let pkg = document.querySelector("td.main").textContent.match(/(?<=AUR : )(.*)(?=.git)/g);
targetTag.insertAdjacentHTML('beforebegin', '<a href="aurin://' + pkg + ' "><button id="aurin_button" class="aurin_install_button">Install Now</button></a>');

function removeClass(){
    myButton.className = myButton.className.replace(new RegExp('(?:^|\\s)loading(?!\\S)'), '');
}

var myButton = document.getElementById('aurin_button');


myButton.addEventListener("click", function loader() {
    myButton.className = myButton.className + ' loading';
}, false);


