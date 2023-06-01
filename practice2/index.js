const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
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

  let items = [];

  let isBtnDisabled = false;
  while (!isBtnDisabled) {
    for (const product of products) {
      let title = "Null";
      let price = "Null";
      let img = "Null";
      let rating = "Null";
      let stock = "Null";
      // let delivery = "Null";

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
      try {
        rating = await page.evaluate(
          (e) => e.querySelector(".a-icon-alt").textContent,
          product
        );
      } catch (error) {}
      try {
        stock = await page.evaluate(
          (e) =>
            e.querySelector(
              ".a-row.a-size-base.a-color-secondary .a-size-base.a-color-price"
            ).textContent,
          product
        );
      } catch (error) {}
      // try {
      //   delivery = await page.evaluate(
      //     (e) =>
      //       e.querySelector(
      //         ".a-row.a-size-base.a-color-secondary.s-align-children-center > span > span.a-color-base"
      //       ).textContent,
      //     product
      //   );
      //   console.log(delivery);
      // } catch (error) {
      //   console.log(error);
      // }

      if (title !== "Null") {
        items.push({ title, price, img, rating, stock });
      }

      await page.waitForSelector("li.a-last", { visible: true });
      const is_disabled = (await page.$("li.a-disabled.a-last")) == null;

      isBtnDisabled = is_disabled;
      if (!is_disabled) {
        page.click("li.a-last");
      }
    }
  }
  console.log(items);

  // save data to JSON file
  // fs.writeFile("./json_files/items.json", JSON.stringify(items), (err) => {
  //   if (err) throw err;
  //   console.log("items File Saved");
  // });
  // await browser.close();
})();
