//----------------------------------------
// Iperative method
//----------------------------------------
//-- Create controller
sap.ui.controller("products.Product", {
  //--declare the oData model
  onInit: function () {
    // URL of the OData service - IMPORTANT: relative to the server
    var sServiceUrl = this.getUrl("/sap/opu/odata/sap/PRODUCTS/");
    // create OData model instance with service URL and JSON
    var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, user, password);
    //var oModel = new sap.ui.model.odata.ODataModel( "proxy/http/server:port/sap/opu/odata/sap/Z_TM_BANK_SRV", true, "Username", "Password");
    //var oModel = new sap.ui.model.odata.ODataModel( "http://domain_name/sap/opu/odata/sap/Z_TM_BANK_SRV",false, "Username", "Password");

    oModel.oHeaders = {
    				"DataServiceVersion": "3.0",
    				"MaxDataServiceVersion": "3.0"
    		}

    //-- Attach model to core
    sap.ui.getCore().setModel(oModel,"products");
    //sap.ui.getCore().setModel(oModel);
  },
  executeOrderCreation: function () {
    // Retreive previously created Model
    //oModel = sap.ui.getCore().getModel();
    var oModel = sap.ui.getCore().getModel("products");
    //.....
    //.....
    oModel.setHeaders({
      "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRF-Token":"Fetch"
    });
    // Declare a variable to handle the security token
    var token;
    // Create a read request to retreive the X-CSRF token
    oModel.read('/SOHeaders', null, null, false, function (oData, oResponse) {
      token = oResponse.headers['x-csrf-token'];
      },
      function () {
        alert("Error on read process");
      }
    );
    // Set POST request header using the X-CSRF token
    oModel.setHeaders({
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "DataServiceVersion": "2.0",
      "Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
      "X-CSRF-Token": token
    });
    // Call the create request
    oModel.create('/SOHeaders', requestORderHeader, null, function (oData, oResponse) {
      alert ('Order creation succeed !');
      },
      function () {
        alert('Call service creation failed');
      }
    );
  },

});

//----------------------------------------
//-- New lib method
//----------------------------------------
var oNewEmployee = {
    firstName  : "",
    lastName : ""
};
var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/employee.svc/", true);
oModel.create('/Employees', oNewEmployee, null,
    function (oData, oResponse) {
        sap.ui.commons.MessageBox.show("Employee was created",
            sap.ui.commons.MessageBox.Icon.SUCCESS,
            "SUCCESS",
            [sap.ui.commons.MessageBox.Action.OK], null, sap.ui.commons.MessageBox.Action.OK
        );
    },
    function (oError) {
        var oErrorData, oResponse, sContentType;
        oErrorData   = oError.oData;
        oResponse    = oErrorData.response;
        sContentType = oResponse.headers['content-type'];       //FIXME This causes an error on OS X Safari!
        //
        normalHeaders = {
          "accept": "Accept",
          "content-type": "Content-Type",
          "dataserviceversion": "DataServiceVersion",
          "maxdataserviceversion": "MaxDataServiceVersion"
        };
        for (name in aHeaders) {
          lowerName = name.toLowerCase();
          normalName = normalHeaders[lowerName];
          if (normalName && name !== normalName) {
            val = aHeaders [name];
            delete aHeaders [name];
            aHeaders [normalName] = val;
          }
        }

        oErrorData     = oError.oData;
        oResponse      = oErrorData.response;
        sContentType   = aHeaders['Content-Type'];       //This works now even in Max OS X Safari
    }
);


//---------------------------------------------------------------------------

//-- Alternative
// Send OData Create request
 var oModel = this.getView().getModel();
 oModel.create("/Banks", mPayload, {
   success : jQuery.proxy(function (mResponse) {
     this.initializeNewProductData();
     sap.ui.core.UIComponent.getRouterFor(this).navTo("product", {
       from: "master",
       product: "Products(" + mResponse.ID + ")",
       tab: "supplier"
     }, false);
     jQuery.sap.require("sap.m.MessageToast");
     // ID of newly inserted product is available in mResponse.ID
     this.oBusyDialog.close();
     sap.m.MessageToast.show("Product '" + mPayload.Name + "' added");
   }, this),
   error : jQuery.proxy(function () {
     this.oBusyDialog.close();
     this.showErrorAlert("Problem creating new product");
     }, this)
});


//-- Alternative format
oModel.create('/<service name>',fileTarget, {
  //merge : true,
  success : function (postData, response) {
    var x;
    alert("success");
  },
  error : function (error) {
    alert("epic fail")
  }
});
