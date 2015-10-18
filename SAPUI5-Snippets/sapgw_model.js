//-- Posting to Gateway with SAPUI5

//-- you need to reference the datajs library
jQuery.sap.require("sap.ui.model.odata.datajs");

//-- get values
var firstName = sap.ui.getCore().byId("firstNameTextField").getValue(),
lastName = sap.ui.getCore().byId("lastNameTextField").getValue(),
handle = sap.ui.getCore().byId("handleTextField").getValue(),
email = sap.ui.getCore().byId("emailTextField").getValue(),
status = sap.ui.getCore().byId("statusTextField").getValue();

//-- create the data entry object
var contactEntry = {
  Handle: handle,
  FirstName: firstName,
  LastName: lastName,
  Email: email,
  Status: status
};

var serviceURI = "http://<host>:<port>/sap/opu/sdata/sap/<service>/Contacts";

//-- build a request
var request = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
    "Content-Type": "application/atom+xml",
    "DataServiceVersion": "2.0"
    },
  requestUri: serviceURI,
  method: "POST",
  user: "developer",
  password: "ch4ngeme",
  data: contactEntry
};

//-- post the request
OData.request(request, function (data) {
  //Success Callback
  sap.ui.commons.MessageBox.show("New contact saved successfully.", sap.ui.commons.MessageBox.Icon.SUCCESS, "Contact Saved", sap.ui.commons.MessageBox.Action.OK);
  }, function (err) {
  //Error Callback:
  }
);
