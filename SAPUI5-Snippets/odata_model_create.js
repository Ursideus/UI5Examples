//--
jQuery.sap.require("sap.ui.commons.MessageBox");

var oModel = new sap.ui.model.odata.ODataModel("http://services.odata.org/Northwind/Northwind.svc/");

var oEntry = {
  YourID = "0001",
  Name = "Peter"
};

var oModel = sap.ui.getCore().getModel();

//-- create function triggers a POST request to an OData service which was
//-- specified during creation of the OData model
oModel.create('/EntitySet', oEntry, null, function () {
    sap.ui.commons.MessageBox.show(
         sap.ui.commons.MessageBox.alert("Success!");
     );
    },function () {
      sap.ui.commons.MessageBox.alert("Error!");
});
