const puppeteer = require('puppeteer-extra');
const express = require('express');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require("fs")

//Zum Crawlen wird die Puppeteer Library genutzt
//Stealth wird genutzt, um Bot Protection zu umgehen
puppeteer.use(StealthPlugin());

const app = express();
const port = process.env.PORT || 3000; 

//Öffnen eines Express Servers, der auf den Port 3000 hört
app.get('/get-cookies', async (req, res) => {
    try {
        //Headless Browser starten
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox'],
          defaultViewport: null
      });
        const page = await browser.newPage();
    
        const url = req.query.url;

        if (!url) {
            return res.status(400).json({ message: 'Missing required parameter: url' });
        }

        //Öffnen der übergeben URL
        await page.goto(url);
    
        //Warten bis der Body fertig geladen wurde
        await page.waitForSelector('body');
    
        //Alle Cookies der Website abrufen
        const cookies = await page.cookies();

        await browser.close();

        const vendorsJSON = fs.readFileSync("./vendor-list.json")
        const vendors = JSON.parse(vendorsJSON).vendors;

        const cookieDBJSON = fs.readFileSync("./cookie_db.json")
        const cookieDB = JSON.parse(cookieDBJSON)

        let cookieInfos = []

        //In der CookieDb wird nach den gefunden Cookies gesucht
        cookies.forEach(cookie => {
            let name = cookie.name;
            let filteredInfos = cookieDB.filter( (c) => {return c.c_name.toLowerCase() == name.toLowerCase()})
            
            if(filteredInfos.length > 0) cookieInfos.push(filteredInfos)
        });

        let output = []

        //Die Namen der Cookies in der CookieDb werden mit der Vendor List verglichen, damit die IAB Vendor ID gefunden werden kann
        cookieInfos[0].forEach(info => {
            let dataController = info.DataController;
            if(dataController != null && dataController != ''){
                for (const [key, value] of Object.entries(vendors)) {
                    if(value.name){
                        if(value.name.toLowerCase().includes(dataController.toLowerCase())){
                            output.push(value);
                        }
                    }
                }
            }
        })
        res.json({ cookies: output });
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving cookies' });

      }
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });


