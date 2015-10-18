
sap.ui.controller("mypackage.Events", {  
    onInit : function () {  
        this.byId("eventDetail").setVisible(false);          
    },      
    onRowSelect : function (event) {  
        eventDetail = this.byId("eventDetail");  
        eventDetail.bindContext(event.getParameter("rowContext"));  
        eventDetail.setVisible(true);  
    }  
});  
