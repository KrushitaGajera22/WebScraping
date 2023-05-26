const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A11036071%2Cp_36%3A1253503011&dc&fs=true&page=5&qid=1685106687&rnid=16225007011&ref=is_pn_4",
    {
      waitUntil: "load",
    }
  );

  const is_disabled = await page.$("li.a-disabled.a-last") !== null;

  console.log(is_disabled);

  await browser.close();
})();
