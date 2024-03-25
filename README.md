# Cookie Crawler
Diese Projekt crawlt alle Cookies einer Website und gibt sie anschließend als JSON zurück.
Hierfür wird ein Express Webserver implementiert, welcher bei Aufruf einen Puppetteer Crawler startet. Der Puppetteer Crawler durchsucht die übergebene URL nach Cookies. Anschließend werden alle Cookies mit der Vendor-List der IAB verglichen und alle Cookies zurückgegeben, die durch ein TCF Cookie Consent verwaltet werden können.
## GET: /get-cookies
**URL:** `/get-cookies`
**Methode:** `GET`
**Parameter:** `url (required)`
### Success Response
**Code** : `200`
**Content example**

```json
{
    "cookies":[
   {
      "id": 755,
      "name": "Google Advertising Products",
      "purposes": [1,3,4],
      "legIntPurposes": [2,7,9,10],
      "flexiblePurposes": [2,7,9,10],
      "specialPurposes": [1,2],
      "features": [1,2],
      "specialFeatures": [ ],
      "cookieMaxAgeSeconds": 34190000,
      "usesCookies": true,
      "cookieRefresh": false,
      "usesNonCookieAccess": true,
      "dataRetention": {
        "stdRetention": 548,
        "purposes": {
          "3": 180,
          "4": 180
        },
        "specialPurposes": {
          "1": 1096
        }
      },
      "urls": [
        {
          "langId": "en",
          "privacy": "https://business.safety.google/privacy/",
          "legIntClaim": "https://policies.google.com/privacy#europeanrequirements"
        },
      ],
      "dataDeclaration": [1,2,3,5,6,7,8,10, 11],
      "deviceStorageDisclosureUrl": "https://www.gstatic.com/iabtcf/deviceStorageDisclosure.json"
    }
    ]
}
```
### Error Responses

**Condition** :Parameter 'url' fehlt

**Code** : `400`

### Oder

**Condition** : Etwas ist schief gelaufen.

**Code** : `500`
