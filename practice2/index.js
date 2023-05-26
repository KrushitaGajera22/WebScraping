const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A11036071%2Cp_36%3A1253503011&dc&fs=true&qid=1635596580&rnid=16225007011&ref=sr_pg_1"
  );

  const products = await page.$$(
    ".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  let i = 0;

  let items = [];

  for (const product of products) {
    let title = "Null";
    let price = "Null";
    let img = "Null";

    try {
      title = await page.evaluate(
        (e) => e.querySelector("h2 > a > span").textContent,
        product
      );
    } catch (error) {}
    try {
      price = await page.evaluate(
        (e) => e.querySelector(".a-price > .a-offscreen").textContent,
        product
      );
    } catch (error) {}
    try {
      img = await page.evaluate(
        (e) => e.querySelector(".s-image").getAttribute("src"),
        product
      );
    } catch (error) {}

    if (title !== "Null") {
         items.push({title, price, img});
    }
  }

  console.log(items);
  // await browser.close();
})();
