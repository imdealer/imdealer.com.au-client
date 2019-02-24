# imdealer.com.au-client
IMDEALER Client Application

## Technical Stack
- HTML
- CSS
- JavaScript

## Used Library
- Bootstrap
- jQuery
- Select2

## 가상서버 실행 방법
1. 이 레포를 clone 한다.
2. vserver 디렉토리에서 다음 명령어 수행
```
npm install
```
3. 그 다음 vserver 디렉토리에서 다음 명령어 수행
```
// dealer_product.html 을 원하는 파일명으로 바꾼다. (개발하고자 하는)

// Windows
npm run win -- --html dealer_product.html

// Mac
npm start -- --html dealer_product.html
```
4. 자동으로 브라우저 창이 열린다.
5. 끝. (종료는 control + c)

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

### Showroom - all user cars and photos of them (deprecated)
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

### Showroom - user car - by id
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_car/:id
required headers: x-api-key
required body: client_application_id
required URL params: /:id
```

### Showroom - user cars - by user id 
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_cars/:user_id
required headers: x-api-key
required body: client_application_id
required URL params: /:user_id
```

### Dealer Signup - upload photo (deprecated)
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/photo/:for
required headers: x-api-key
required body: client_application_id
required URL params: /:for
excepted parameter values for /:for: 'dealer_profile'
```

### Dealer Signup
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/dealer
required headers: x-api-key
required body: {
  client_application_id: int
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  mobile_number: string,
  comment: string,
  company_name: string,
  abn: string,
  dealer_license_number: string,
  street1: string,
  street2: string,
  suburb: string,
  state: string,
  postcode: string
}
```

### Showroom - count total cars
```
method: POST
endpoint: http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/count/user_cars
required headers: x-api-key
required body: client_application_id
```