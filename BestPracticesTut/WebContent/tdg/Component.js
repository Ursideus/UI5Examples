
jQuery.sap.declare("sap.ui.demo.tdg.Component");
jQuery.sap.require("sap.ui.demo.tdg.MyRouter");

sap.ui.core.UIComponent.extend("sap.ui.demo.tdg.Component", {
  metadata: {
        name : "TDG Demo App",
        version : "1.0",
        includes : [],
        dependencies : {
            libs : ["sap.m", "sap.ui.layout"],
            components : []
        },
  rootView: "sap.ui.demo.tdg.view.App",
  /*
    You can do this by specifying a createContent function in the component and returning the view there
    See below
  */
  config: {
           resourceBundle : "i18n/messageBundle.properties",
           serviceConfig : {
               name : "Northwind",
               serviceUrl : "http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
           }
       },
       routing : {
    			config : {
    				routerClass : sap.ui.demo.tdg.MyRouter,
    				viewType : "XML",
    				viewPath : "sap.ui.demo.tdg.view",
    				targetAggregation : "detailPages",
    				clearTarget : false
    			},
    			routes : [
              {
      					pattern : "",
      					name : "main",
      					view : "Master",
      					targetAggregation : "masterPages",
      					targetControl : "idAppControl",
      					subroutes : [{
      							pattern : "{product}/:tab:",
      							name : "product",
      							view : "Detail"
      					}]
        			},
              {
      					name : "catchallMaster",
      					view : "Master",
      					targetAggregation : "masterPages",
      					targetControl : "idAppControl",
      					subroutes : [{
      							pattern : ":all*:",
      							name : "catchallDetail",
      							view : "NotFound"
      					}]
        			}
    		  ]}
  },
  init: function () {

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        var mConfig = this.getMetadata().getConfig();

        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath("sap.ui.demo.tdg");

        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
        });
        this.setModel(i18nModel, "i18n");

        // Create and set domain model to the component
        var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        this.setModel(oModel);

        // set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch : sap.ui.Device.support.touch,
            isNoTouch : !sap.ui.Device.support.touch,
            isPhone : sap.ui.Device.system.phone,
            isNoPhone : !sap.ui.Device.system.phone,
            listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
        });
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "device");

        this.getRouter().initialize();
    },
     //-- create root view
     createContent: function () {
       var oView = sap.ui.view({
                 id : "app",
                 viewName : "sap.ui.demo.tdg.view.App",
                 type : "XML",
                 viewData : { component : this }
             });
       // set i18n model
       //var i18nModel = new sap.ui.model.resource.ResourceModel({
       //    bundleUrl : "i18n/messageBundle.properties"
       //});
       //oView.setModel(i18nModel, "i18n");
       return oView;
     }
});

//sap.ui.demo.tdg.Component.prototype.createContent = function () {
  // Using sap.ui.localResources('views'); in this context would still
  // register the path relative to our index.html, not the Component.js
  // so we do not use it. Instead we use the same prefix as the component
  // for our views, because we know that that path must be set correctly
  // if this file has been loaded.

  // This should look for "./views/Home.view.js" relative to the components
  // path, since the components path was registered in the index.html ouside
  // the component
  //var view = sap.ui.jsview("idHome", "sap.ui.demo.tdg.view.App");
  //return view;
//};
