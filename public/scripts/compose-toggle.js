//event handler for toggling the compose form on and off
$('#nav-bar button').click(function() {
        $('section.new-tweet').slideToggle('fast');
        $(".new-tweet textarea").focus();
})