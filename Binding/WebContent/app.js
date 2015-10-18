
//construct and configure the app shell with a single worksetitem  
var shell = new sap.ui.ux3.Shell("objectivesAppShell", 
	{showSearchTool:false, showInspectorTool:false, showFeederTool:false, showLogoutButton:false});      
shell.addWorksetItem(new sap.ui.ux3.NavigationItem({key : "wi_Events", text : "Events"}));  
//construct the view  
var eventsView = sap.ui.view({ type: sap.ui.core.mvc.ViewType.JSON,  
                           viewName: "mypackage.Events",  
                           controller: sap.ui.controller("mypackage.Events")   
                         });  
//load and bind the model  
var eventsModel = new sap.ui.model.json.JSONModel();  
eventsModel.loadData("Events.json");  
eventsView.setModel(eventsModel);  
var eventsList = eventsView.byId("eventList");  
eventsList.bindRows("events");  
//place view in app shell, app shell in uiArea  
shell.setContent(eventsView);  
shell.placeAt("uiArea");  
