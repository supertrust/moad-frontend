import axios from "axios"

const BaseURL = 'http://223.130.129.41/api/get-faq/{filter}' 
const BaseURL_service = 'http://223.130.129.41/api/get-faq/service_use' 

export const faqService = {
    faq,
    faq_service_use
}
// const token = localStorage.getItem('token')

async function faq(token) {
    return await axios.get(BaseURL, { headers : {'Authorization' : 'Bearer' + token}})
}
async function faq_service_use(token) {
    return await axios.get(BaseURL_service, { headers : {'Authorization' : 'Bearer' + token}})
}