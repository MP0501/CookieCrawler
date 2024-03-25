# Cookie Crawler
Diese Projekt crawlt alle Cookies einer Website und gibt sie anschließend als JSON zurück.
Hierfür wird ein Express Webserver implementiert, welcher bei Aufruf einen Puppetteer Crawler startet. Der Puppetteer Crawler durchsucht die übergebene URL nach Cookies. Anschließend werden alle Cookies mit der Vendor-List der IAB verglichen und alle Cookies zurückgegeben, die durch ein TCF Cookie Consent verwaltet werden können.
## GET: /get-cookies
Parameter: url (Enthält die URL, die durchsucht werden soll)
Response: 200 (Gibt alle IAB Cookies der URL zurück)
Response: 400 (URL Parameter fehlt)
Response: 500 (Etwas ist schief gelaufen)
