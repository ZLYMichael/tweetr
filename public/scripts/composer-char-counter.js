//counts the remaining characters for the textarea
$(function() {
    $("section.new-tweet").find('textarea').on("keyup keydown", function() {
        const maxCount = 140;
        const cRemain = maxCount - $(this).val().length;
        const counter = $(this).parent().find(".counter");
        counter.text(cRemain);
        if(cRemain < 0) {
            counter.addClass("over-count");
        } else {
            counter.removeClass("over-count");
        }
    });
});