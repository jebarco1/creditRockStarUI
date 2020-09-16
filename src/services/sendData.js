export function sendData(type, method , userData )
{ 


//let BaseUrl = "http://ec2-52-90-101-255.compute-1.amazonaws.com/api/v1/user/";
let BaseUrl = "http://127.0.0.1:8000/api/v1/";

return new Promise((resolve, reject) => {

     var requestHeader = { method: method,  
                          headers: { 'Access-Control-Allow-Origin': '*' ,'Accept': 'application/json', 'Content-Type': 'application/json',
                          Authorization: 'Bearer ' + userData.api_token }};
            
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


 
