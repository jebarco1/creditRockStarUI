export function sendData(type, method , userData )
{ 

let BaseUrl = "3.14.163.40/creditrockstarAPi/api/v1/";

console.log(BaseUrl+type);

return new Promise((resolve, reject) => {
     
     var requestHeader = { method: method,  
                          headers: { 'Access-Control-Allow-Origin': '*' ,'Accept': 'application/json', 'Content-Type': 'application/json',
                          Authorization: 'Bearer ' + localStorage.getItem('api_token') }};
            
    if(method !== 'GET')
    {    
        requestHeader['body'] = JSON.stringify(userData);
        
    }
    console.log(requestHeader);
            fetch(BaseUrl+type, requestHeader)
            .then((response) => response.json())
            .then((responseJson) => {
               resolve(responseJson);
            })
            .catch((error) => {
               console.error(error);
            });
   
       
    });
} 




 
