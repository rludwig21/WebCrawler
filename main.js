import { gotScraping } from "got-scraping"; //using this instead of axios to get by scrapping
import * as cheerio from "cheerio";
const url = "https://www.indeed.com/jobs?q=developer&l=Buffalo,+NY&start=0";

//call 
await fetchData(url);

//function to scrap 1st page on indeed
async function fetchData(url){
    console.log(`Crawling data... ${url}`)
    // make http call to url
    let response = await gotScraping.get(url);

    let html = response.body;

    //console.log(html);

    const $ = cheerio.load(html);
    const jobsTable = $('.jobsearch-ResultsList .resultContent');
    
    //loop over li
    jobsTable.each(function() {
        let job = {
            Title: $(this).find('.jobTitle a').text(),
            Company: $(this).find('.companyName').text(),
            Location: $(this).find('.companyLocation').text(),
            Salary: $(this).find('.salary-snippet-container').text(),
            Url:  $(this).find('.jobTitle a').attr("href"),
        }        
        console.log(job);
    });
}