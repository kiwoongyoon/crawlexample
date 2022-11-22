const axios = require("axios"); 
const cheerio = require("cheerio") ;
const getHtml =async(keyword)=>{
    try{
        const html= (await axios.get(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${encodeURI(keyword)} 정신과`)).data;
        return html ;
    }catch(err){
        console.log(err);
    }
}; 

const parsing = async(page)=>{
   const $ = cheerio.load(page) ;
   const hospitals =[] ; 
   const $courseList = $(".DWs4Q");
   let i =0 ; 
   
   $courseList.each((idx, node)=>{
    
    const title= $(node).find(`.place_bluelink`).text().trim();
    const type = $(node).find(`.lHBM6`).text() ;
    const isopen = $(node).find(`.XNkUh`).text() ;
    const address =$(node).find(`.nvb9q`).text();
    hospitals.push({
        title, type, isopen,address
    });
    
   
});
    return hospitals ;
}; 
const getHospital= async(keyword)=>{
    const html = await getHtml(keyword);
    const hospitals= await parsing(html) ;
    console.log(hospitals);
    console.log("it was result of hospitals");
};
getHospital("신촌"); 
