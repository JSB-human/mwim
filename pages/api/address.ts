import axios from "axios";

const address = () => {
    let currentUrl : string = '';
    if (typeof window !== "undefined") {
        currentUrl = window.location.href;
    }

    axios.get('/location')
    .then((res) => {
        axios.post('/spring/address/add',{
            ip : res.data.IPv4,
            city : res.data.city,
            country : res.data.country_name,
            latitude : res.data.latitude,
            longitude : res.data.longitude,
            state : res.data.state,
            page : currentUrl
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err)=>{

        })
    })
    .catch((err)=>{
        
    })
    


}

export default address;