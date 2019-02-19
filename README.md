# imdealer.com.au-client
IMDEALER Client Application

## Technical Stack
- HTML
- CSS
- JavaScript
- jQuery

## API
Server API information

### Client ID & API Key
- Client ID : 1
- API Key : 5N64T45-4PD48XB-PDTQX5W-Z5K1AT0

### Showroom - all makers
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/makers
required headers: x-api-key
required body: client_application_id
required URL params: N/A
```

### Showroom - models by maker
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/models/:maker
required headers: x-api-key
required body: client_application_id
required URL params: /:maker
```

### Showroom - years by maker and model
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/years/:maker/:model
required headers: x-api-key
required body: client_application_id
required URL params: /:maker/:model
```

### Showroom - all user cars and photos of them
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_cars/user_car_photos
required headers: x-api-key
required body: client_application_id
required URL params: N/A
```

### Showroom - user cars - by page
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_cars/:max_display/:page
required headers: x-api-key
required body: client_application_id
required URL params: /:max_display/:page
```

### Showroom - user cars - filltered
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_cars/:maker/:model/:year/:transmission/:fuel/:states
required headers: x-api-key
required body: client_application_id
required URL params: /:maker/:model/:year/:transmission/:fuel/:states
```