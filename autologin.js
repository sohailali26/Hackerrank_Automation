const puppy = require('puppeteer')

let contestModerators=['sohailali2601191','ratboy','TRON_','4tnuts','student3']

async function login(){
    //open browser
    const browser = await puppy.launch({
        headless:false,
        defaultViewport:false,
        args:['--start-maximized'],
        //slowMo: 100 
    });

    // search hackerrenk.com in first tab
    let tabs= await browser.pages()
    let tab=tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");

    const usernameTab=await tab.$('#input-1');  //$= querie selector //$$=qurie selector all
    //select user name tab and typr username
    await usernameTab.type('megevis283@tmednews.com');
    const passwordTab=await tab.$("#input-2");
    //selct password tab and write password
    await passwordTab.type('12345@');
    // select and check the remember box
    const remembercheckBox= await tab.$('[type="checkbox"]');
    await remembercheckBox.click();
    //select and click on login button
    const loginButton=await tab.$('[data-analytics="LoginPassword"]');
    await loginButton.click();
    
    // wait for network to be idel between server and brower, because we are clicking dropdown whic fetcg data from server
    await tab.waitForNavigation({waitUntil:"networkidle2"}); 
    await tab.waitForSelector('[data-analytics="NavBarProfileDropDown"]',{   //wait for selected class selector to be fetched from the the server and load on the page //this i used when we load now page
        visible:true
    });

    //select and click dropdown
    let dropdown= await tab.$('[data-analytics="NavBarProfileDropDown"]'); // choose the class selector
    await dropdown.click();

    //select and click on administeration button 
    let administrationButton= await tab.$('[data-analytics="NavBarProfileDropDownAdministration"]');
    await administrationButton.click();

    // now we have routed to new page so we have to wait for selector before using $
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav .backbone");

    //select and click to manage tab
    let manageChallangesTab= await tab.$$('.admin-tabbed-nav a');
    await manageChallangesTab[1].click();

    // wait because tab changed and page loaded 
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
    //select and click on createchallange
    let CreateChallange= await tab.$(".btn.btn-green.backbone.pull-right");
    await CreateChallange.click();

    //click on text div areas
    await tab.waitForSelector(".CodeMirror-line");

     //enter challange name
    let challangeNameTab=await tab.$('#name');
    await challangeNameTab.click();
    await challangeNameTab.type("Test challange");

    // //write description
    let descriptionTab=await tab.$("#preview");
    await descriptionTab.click();
    await descriptionTab.type("You have given 2 numbers return sum of the 2 number");

    let codeTextAreas=await tab.$$('.CodeMirror-line');
    
    for(let i=0 ; i < codeTextAreas.length ; i++){
        await codeTextAreas[i].click();
        await codeTextAreas[i].type("hello");
    }
    // select and write in tags tab
    let tagstab= await tab.$('#tags_tagsinput');
    await tagstab.click();
    await tagstab.type("SUM");
    await tab.keyboard.press("Enter");

    //click on save button
    let saveContestbutton=await tab.$('.save-challenge.btn');
    await saveContestbutton.click();
    

    //CLICK ON MODERATOR TAB
    await tab.waitForSelector('[data-tab="moderators"]');
    let moderatorTab= await tab.$('[data-tab="moderators"]');
    await moderatorTab.click();

    // add moderators
    await tab.waitForSelector('#moderator');
    let moderatorTextArea= await tab.$('#moderator');
    
    for(let contestModerator of contestModerators){
        await tab.waitForTimeout(5000);
        await moderatorTextArea.type(contestModerator);
        await tab.keyboard.press('Enter');
        
    }

    //click on save button
    await tab.waitForSelector('.save-challenge.btn');
    saveContestbutton=await tab.$('.save-challenge.btn');
    await saveContestbutton.click();

    
};

login();