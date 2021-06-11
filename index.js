const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;


const news = "https://merolagani.com/Index.aspx";

var dontMiss =[];
(async()=>{
   

    const response = await request({
        uri:news,
        headers:{
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip:true
    });
    let $ = cheerio.load(response);
    $('div.media-wrap').each((i,element)=>
{

        const title =$(element).find('a > img').attr('alt').trim();
        const link ="https://merolagani.com" + $(element).find('a').attr('href').trim();
        const image =$(element).find('a > img').attr('src').trim();
 

    dontMiss.push({
      title,
      link,
      image
    });

    (async()=>{
        let detailData =[]; 
        let links=[]; 
        dontMiss.map((item,i)=>{
            links.push(dontMiss[i].link);
            })
            
            for(let link of links)
            {      
               
      const response = await request({
            uri:link, 
              headers:{
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9"
            },
            gzip:true
        });
   
        let $ = cheerio.load(response);
        let title = $("#ctl00_ContentPlaceHolder1_newsTitle").text().trim();
        let date = $('#ctl00_ContentPlaceHolder1_newsDate').text().replace(/\s\s+/g,"");
        let detail =$(' #ctl00_ContentPlaceHolder1_newsDetail > p:nth-child(n)').text().trim();
       

        detailData.push({
            Title:title,
            Date: date,
            Detail: detail
            
        });
            }

const json2 = new json2csv();
const csv1 = json2.parse(detailData);
fs.writeFileSync("./detailData.csv", csv1, "utf-8")
})();

});

console.log("scraping done ..." ); 
const j2cp = new json2csv();
const csv = j2cp.parse(dontMiss);
fs.writeFileSync("./dontmiss.csv", csv, "utf-8")
})
();






