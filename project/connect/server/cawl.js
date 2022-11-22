const axios = require("axios"); 
const cheerio = require("cheerio") ;
const getHtml =async(keyword)=>{
    try{
        
        const html= (await axios.get(`https://www.modoodoc.com/hospitals/?search_query=${encodeURI(keyword)}`)).data;
        return html ;
    }catch(err){
        console.log(err);
    }
}; 
const parsing = async(page)=>{
   const $ = cheerio.load(page) ;
   const courses =[] ; 
   const $courseList = $(".doctor-list-section");
   let i =0 ; 
   $courseList.each((idx, node)=>{
    
    const title= $(node).find(".profile-doctor-box").text();
    courses.push({
        title
    }); 
    console.log(courses); 
   
});
    return courses ;
}; 
const getCourse= async(keyword)=>{
    const html = await getHtml(keyword);
    const courses= await parsing(html) ;
    console.log(courses) ;
};
getCourse("신촌 정신과"); 