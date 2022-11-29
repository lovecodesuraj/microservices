# MICROSERVICES

### Endpoint 
 http://localhost:3000/home/

## Steps :
  1. Create Access token by registering with username and password .
2. Use services :
    

## Creating access token 

### Request

```bash

fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
   
    body: {"userName":"<username>","password":"<password>"  })
  
```

### Response 

```python
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpheWFudHVsbGFoIiwicGFzc3dvcmQiOiJqYXlhbnR1bGxhaCIsImlhdCI6MTY2OTcwNDYzNn0.iH5AVW2q59RIbLq-Z_e-aF1r6ZMDhG-V1ijXuCioEM"
}
```

## Generating thumbnail 

### Request
```bash 
fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    "accessToken":"<accessToken>"
    },
   
    body: {"imageUri":"<public_image_URL>"  })
 
```

### Response
boom
```bash 
 
resized_image
 
```

## Updating docs with jsonpatch

### Request 

```bash 
 
fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      "accessToken":"<accessToken>"
    },
   
    body: {"mydoc":{"name":"tuktuk","roll_No.":"120"}, "thepatch":[{ "op": "replace", "path": "/name", "value": "boom" }]
 })
 
```
### Response

```bash 

{"name":"boom","roll_No.":"120"}
 
```

