$(function() {
    if ($(".map-branch")) {
        $(".map-dot.beijing").addClass("cur");
        $("#company_beijing").show().css({
            "left": $(".map-dot.beijing").position().left + 36,
            "top": $(".map-dot.beijing").position().top - $("#company_beijing").height() / 2 + 8
        });
        $(".map-dot").on("mouseover", function() {
            $(this).addClass("cur").siblings(".map-dot").removeClass("cur");
        });
        $(".map-dot").on("click", function() {
            $(this).addClass("cur").siblings(".map-dot").removeClass("cur");
            var dataid = $(this).attr("data-id")
                , comp = $("#company_" + dataid)
                , otherComp = $("#company_" + dataid).siblings(".branch-map-data");
            comp.fadeIn("fast").css({
                "left": $(this).position().left + 36,
                "top": $(this).position().top - comp.height() / 2 + 8
            });
            otherComp.hide();
        });
        $(".branch-map-data").on("mouseleave", function() {
            $(this).hide();
            $(".map-dot").removeClass("cur");
        });
    }
});