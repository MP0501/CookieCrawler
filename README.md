# Cookie Crawler
Diese Projekt crawlt alle Cookies einer Website und gibt sie anschließend als JSON zurück.
Hierfür wird ein Express Webserver implementiert, welcher bei Aufruf einen Puppetteer Crawler startet. Der Puppetteer Crawler durchsucht die übergebene URL nach Cookies. Anschließend werden alle Cookies mit der Vendor-List der IAB verglichen und alle Cookies zurückgegeben, die durch ein TCF Cookie Consent verwaltet werden können.
#### Implementiert wird diese Web Route:
GET: get-cookies?url=
Als Parameter wird dem Webserver die URL der Website übergeben, die durchsucht werden soll.
