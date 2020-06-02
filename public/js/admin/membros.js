function novo(op){

    if (op==1){
        document.getElementById("cartao").style.display = "block";
        document.getElementById("btnNovo").style.display = "none";
    }else {
        document.getElementById("cartao").style.display = "none";
        document.getElementById("btnNovo").style.display = "block";
    }
    //alert("olaaa novo..a");
}

/*
$('.btnNovo').click(function (event) {
	// Don't follow the link
	event.preventDefault();
	// Log the clicked element in the console
	console.log("Eureca pha");

}); */