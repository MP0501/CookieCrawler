const puppeteer = require('puppeteer-extra');
const express = require('express');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require("fs")

puppeteer.use(StealthPlugin());

const app = express();
const port = process.env.PORT || 3000; 

app.get('/get-cookies', async (req, res) => {
    try {
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

        await page.goto(url);
    
        await page.waitForSelector('body');
    
        const cookies = await page.cookies();

        await browser.close();

        const vendorsJSON = fs.readFileSync("./vendor-list.json")
        const vendors = JSON.parse(vendorsJSON).vendors;

        const cookieDBJSON = fs.readFileSync("./cookie_db.json")
        const cookieDB = JSON.parse(cookieDBJSON)

        let cookieInfos = []

        cookies.forEach(cookie => {
            let name = cookie.name;
            let filteredInfos = cookieDB.filter( (c) => {return c.c_name.toLowerCase() == name.toLowerCase()})
            
            if(filteredInfos.length > 0) cookieInfos.push(filteredInfos)
        });

        let output = []

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


