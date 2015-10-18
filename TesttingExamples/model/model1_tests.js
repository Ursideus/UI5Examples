jQuery.sap.require("sap.ui.app.MockServer");
jQuery.sap.require("sap.ui.model.odata.ODataModel");

function startMockServer(iRespondAfter) {
    // configure respond to requests delay
    sap.ui.app.MockServer.config({
        autoRespond : true,
        autoRespondAfter : iRespondAfter || 10
    });

    // create mockserver
    var oMockServer = new sap.ui.app.MockServer({
        rootUri : "http://sap.com/service/"
    });

    // start and return
    oMockServer.simulate("data/metadata.xml", "data");
    oMockServer.start();
    return oMockServer;
}


function createODataModel(sURL, mSettings) {
    sURL = sURL || "http://sap.com/service/";
    var oModel = new sap.ui.model.odata.ODataModel(sURL, true);

    mSettings = mSettings || {};
    jQuery.each(mSettings, function(sProperty, vValue) {
        sProperty = jQuery.sap.charToUpperCase(sProperty);
        oModel["set" + sProperty](vValue);
    });

    return oModel;
}

//Your test:
asyncTest("Should do something with the model", function () {
  //Arrange
  var oModel = createODataModel();
  var oMockServer = startMockServer(0);

  // System under Test
   var oLabel = new sap.m.Label({
       text : "{/myProperty}"
   });

   oLabel.placeAt("qunit-fixture");
   sap.ui.getCore().applyChanges();

   // Act - trigger the request
   this.clock.tick(50);

   // Assert
   strictEqual("myExpected", oLabel.getText(), "The expected text was present");

   // Cleanup
   oModel.destroy();
   oMockServer.stop();
});
