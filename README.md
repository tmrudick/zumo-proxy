# Summary #

Currently, Windows Azure Mobile Services (ZUMO) doesn't support CORS. This is necessary for building any pure HTML5 enabled application based on ZUMO since there is no way to host HTML documents from within the same domain as a ZUMO application.

zumo-proxy creates a node.js server-side proxy for your HTML5 application so that it can communicate with ZUMO right now without waiting for CORS support! The best part is that this repository has been specially crafted to be easily used with Windows Azure Websites and Kudu (git deploy) which will help you get your HTML5 app up and running in no time.

# Usage #

The zumo-proxy will create a node.js server which listens to all requests within the zumo subdirectory of your Azure Website. This directory name is configurable in the Web.config within this repository. 

When a request is made to the proxy, the same request is issued to the upstream Mobile Service keeping the same HTTP method, all ZUMO related headers and query string parameters in place. Likewise, the response will be passed back through unchanged.

The request to the Mobile Service will only contain the part of the URL after the zumo subdirectory. 

For example, a request to https://xyz.azurewebsites.net/zumo/tables/scores will make a request to https://xyz.azure-mobile.net/tables/scores. 

# Setup & Deployment #

To get up and running you will need to create both a Windows Azure Mobile Service and a Windows Azure Website. All of your data storage will be done within the Mobile Service and all of your HTML and the zumo-proxy will be served through the Website.

1. Create a Windows Azure Mobile Service and note its domain name. (It should look something like MyCoolHtmlApp.azure-mobile.net)
2. Create a Windows Azure Website. 
3. Add an app setting to the Website called "ForwardUrl" with a value of the fully qualified domain name of your Mobile Service.
4. Clone/fork the zumo-proxy repository.
5. Update index.html to be a cool rockin' app HTML5 app which uses ZUMO.
6. Set up git deploy with your Website and the zumo-proxy repository.
7.     git push azure master