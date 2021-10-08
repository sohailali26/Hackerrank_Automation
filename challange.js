const puppy=require('puppeteer'); //

async function openbrowser() {
    const browser= await puppy.launch({  // LAUNCH BROWSER USING PUPPETEER

        // BROWSER PROPERTIES
        headless:false,
        defaultViewport:false,
        args:[
            '--start-maximized'
        ]
    });
    // function to open a tab and search google .com
    let tabs=browser.pages().then(function(tabs) {
        tabs[0].goto("https://www.google.com/");  
    })


    // function to 10 open a tab and search google .com parallely
    for (let index = 1; index <= 10; index++) {
        await browser.newPage().then(async function(tab){
            tab.goto("https://www.google.com/");
        })     
    }
    

}
openbrowser();// FUNCTION CALL
