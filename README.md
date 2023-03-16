# ERLI-Pictures

## Setup:

$ Go to \src\mysqlConfig.ts and provide mySQL details.


$Then you can run this app by:
$ npm install
$ npm start


##Endpoints

#Download Image
POST http://localhost:8393/downloadImage/
body {
  "url": 
}

Response:
{
    "urlStatus": "http://localhost:8393/status/tub21679006416149"
}

#Check status
GET http://localhost:8393/status/:id

Response:
{
    "result": [
        {
            "status": 
        }
    ]
}

#Get Image
GET http://localhost:8393/getImage/:id

Response: 
{
    "image": [
        {
            "id":
            "sourceURL": 
            "targetURL": 
            "addedDate": 
            "finishDate":
            "status": 
        }
    ]
}

#Get All Images

GET http://localhost:8393/getAllImages
