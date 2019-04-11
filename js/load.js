
document.onreadystatechange = completeLoading;
  
function completeLoading() {  
    if (document.readyState == "complete") {  
        $("#load").animate({opacity:"0"});
        setTimeout(() => {
            $("#load").remove()
        }, 1000);
    }
}  