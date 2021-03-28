const menu = {
    companyClick(ev){
        fetch("./company-modal.html").then(f => f.text()).then(f => {
            $(".modal-body").html(f);
            $("#exampleModal").modal("show")
        })
    },
    femiAppSeries(){
        $("#frame").attr("src","/femi-apps-series")
    },
    music(){
        $("#frame").attr("src","/music")
    }
}
