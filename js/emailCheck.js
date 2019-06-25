var btnEmail = document.getElementById('send-sail-throu-signup')
// validation function with RegEx
function validateEmail(email) {
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var email = document.getElementById('emailValue').value
return re.test(String(email).toLowerCase());
}

// When the user clicks the button, open the modal 
btnEmail.onclick = function() {
    emailMsg(validateEmail($('.email-input').val()))
}

$('.email-input').on('keypress', function(e) {
    if(e.which == 13) {
        emailMsg(validateEmail($(this).val()))
    }
})

// When the user clicks the button, open the modal 
$('.sign-up-close').click(()=>{
    $('.message-wrapper').hide(500)
})

// email modal
const emailMsg = function(isValid) {
    $('.info-wrapper').html('<p>Email Info</p>')

    if (!isValid) {
        $('.sign-up-error-message').fadeIn(500)
    } else {
        $('.sign-up-error-message').hide(500)
        $('.email-input').val('')
    }
}