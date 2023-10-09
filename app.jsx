const { Builder, By } = require("selenium-webdriver");

const sample = async () => {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    //login
    await driver.get("https://www.facebook.com");
    await driver
      .findElement(By.xpath("//input[@name='email']"))
      .sendKeys("admin@123@gmail.com");
    await driver
      .findElement(By.xpath("//input[@name='pass']"))
      .sendKeys("admin");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    await driver.sleep(1000);

    //postdiscription
    let Scrolls = 10;
    let currentScrolls = 0;
    while (currentScrolls < Scrolls) {
      await driver.executeScript("window.scrollBy(0, window.innerHeight)");
      await driver.sleep(1000);
      currentScrolls++;
    }
    const post = await driver.findElements(
      By.xpath(
        "//div[@class='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs x126k92a']"
      )
    );
    //console.log(post);
    for (const posts of post) {
      //console.log(posts);
      const description = await posts.getText();
      console.log(description);
    }
    await driver.sleep(1000);
    await driver.switchTo().newWindow();

    //cookies
    await driver.get("https://www.facebook.com/api/graphql/");
    const cookies = await driver.manage().getCookies();
    console.log("Cookies:", cookies);
    for (let cookie of cookies) {
      console.log(cookie.name + "=" + cookie.value);
    }
    await driver.switchTo().newWindow();
    await driver.sleep(1000);

    //another window
    await driver.get("https://www.google.com");
  } finally {
    await driver.quit();
  }
};
sample();
