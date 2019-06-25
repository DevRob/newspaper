// modal.js
var modal = document.getElementById("infoModal");

// Get the button that opens the modal
var btn = document.getElementById("infoBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    getBrowserInfo()
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

}

// Get Browser info
const getBrowserInfo = function() {
    modal.style.display = "block";
}

function burgerMenu(x) {
    x.classList.toggle("change");
    $('.article-nav').toggle();
}

$('form').submit(function() {
    return false;
});