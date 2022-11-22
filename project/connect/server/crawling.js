const axios = require("axios"); 
const cheerio = require("cheerio") ;

const getHtml2 = async(keyword)=>{
    try{
        const html2 = (await axios.get(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${encodeURI(keyword)} 심리상담센터`)).data; 
        return html2 ;
    }catch(err){
        console.log(err); 
    }
}; 
const parsing2= async(page)=>{
    const $=cheerio.load(page); 
    const centers = [];
    const $centerList=$(".VLTHu"); 
    $centerList.each((idx, node)=>{
        const title =$(node).find(`.place_bluelink`).text();
        // const type = $(node).find().text() ;
         const isopen = $(node).find(`.uH1ms`).text() ;
        // const address = $(node).find(`.o8CtQ> span`).text();
        let prephone = $(node).find(`.mqM2N`).text();//안내 라는 한글 붙여있는
        let phone = prephone.substring(0, prephone.indexOf('안'));
        if(prephone.indexOf('안')===-1){
            phone= prephone ; 
        }
        console.log(typeof(phone));
        centers.push({
            title, isopen, phone
            // , type, isopen, address
        }); 
    });
    return centers ;
};
const getCenters = async(keyword)=>{
    const html2 = await getHtml2(keyword); 
    const centers = await parsing2(html2) ; 
    console.log(centers) ; 
}; 
getCenters("신촌") ; 