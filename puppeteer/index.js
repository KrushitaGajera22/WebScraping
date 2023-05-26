const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.traversymedia.com");

  //   await page.screenshot({ path: "example.png", fullPage: true });
  // await page.pdf({ path: "example.pdf", format: 'A4'})
  // const html = await page.content()
  // const title = await page.evaluate(() => document.title)
  // const text = await page.evaluate(() => document.body.innerText)
  // const links = await page.evaluate(()=> Array.from(document.querySelectorAll('a'), (e) => e.href))

  //   const courses = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("#cscourses .card"), (e) => ({
  //       level: e.querySelector(".card-body .level").innerText,
  //       title: e.querySelector(".card-body h3").innerText,
  //       url: e.querySelector(".card-footer a").href
  //     }))
  //   );

  // for All Courses
  const courses = await page.$$eval("#cscourses .card", (elements) =>
    elements.map((e) => ({
      level: e.querySelector(".card-body .level").innerText,
      title: e.querySelector(".card-body h3").innerText,
      url: e.querySelector(".card-footer a").href,
    }))
  );

  // console.log(courses);

  // for premium courses
  const Premium_courses = await page.$$eval(".pricing", (elements) =>
    elements.map((e) => ({
      course: e.querySelector("h4").innerText,
      pricing: e.querySelector(".pricing__info h2").innerText,
      heading: e.querySelector(".pricing__heading").innerText,
    }))
  );

  // console.log("Premium_courses : ", Premium_courses);

  //for new courses
  const new_courses = await page.$$eval(
    "#block-1575400199758_0 > div",
    (elements) =>
      elements.map((e) => ({
        course: e.querySelector("h3 span").innerText,
        about: e.querySelector("p span").innerText,
        url: e.querySelector("a").href,
      }))
  );

  // console.log("new_courses : ", new_courses);

  // details about youtube channel
  const youtube_channel = await page.$$eval(
    "#block-1672491685391_1 > div",
    (elements) =>
      elements.map((e) => ({
        channel: e.querySelector("h2").innerText,
        about: e.querySelector("p").innerText,
        url: e.querySelector("a").href,
      }))
  );

  // console.log("youtube_channel : ", youtube_channel);

  // save data to JSON file
  fs.writeFile(
    "./json_files/youtube_channel.json",
    JSON.stringify(youtube_channel),
    (err) => {
      if (err) throw err;
      console.log("youtube_channel File Saved");
    }
  );

  // for web guide
  const guide = await page.$$eval("#block-1575400154555_0 > div", (elements) =>
    elements.map((e) => ({
      name: e.querySelector("h2").innerText,
      subtitle: e.querySelector("p").innerText,
      about: e.querySelector("p:nth-child(5)").innerText,
      price: e.querySelector("a").innerText,
      url: e.querySelector("a").href,
    }))
  );

  // console.log("guide : ", guide);

  // save data to JSON file
  fs.writeFile("./json_files/guide.json", JSON.stringify(guide), (err) => {
    if (err) throw err;
    console.log("guide File Saved");
  });

  // youtube video links of courses
  const courses_video_links = await page.$$eval(".feature", (elements) =>
    elements.map((e) => ({
      url: e.querySelector("a").href,
    }))
  );

  // console.log("courses_video_links : ", courses_video_links);

  // for links of social media
  const links = await page.$$eval(
    "#block-1672493654879  div  div",
    (elements) =>
      elements.map((e) => ({
        twitter: e.querySelector("a:nth-child(1)").href,
        instagram: e.querySelector("a:nth-child(2)").href,
        youtube: e.querySelector("a:nth-child(3)").href,
        github: e.querySelector("a:nth-child(4)").href,
        likein: e.querySelector("a:nth-child(5)").href,
      }))
  );

  // console.log("links : ", links);

  const course = [...courses, ...Premium_courses, ...new_courses];

  // save data to JSON file
  fs.writeFile("./json_files/course.json", JSON.stringify(course), (err) => {
    if (err) throw err;
    console.log("Course File Saved");
  });

  const Links = {
    ...courses_video_links,
    ...links,
  };
  // console.log(Links);

  // save data to JSON file
  fs.writeFile("./json_files/Links.json", JSON.stringify(Links), (err) => {
    if (err) throw err;
    console.log("Links File Saved");
  });

  await browser.close();
}

run();
