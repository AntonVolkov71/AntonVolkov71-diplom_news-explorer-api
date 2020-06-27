## README AntonVolkov71-diplom_news-explorer-api
#### Read laziness? follow the [link](ayavolk.ga) :link:

#### But there is nothing beautiful :flushed:

<br>
<h1 align='center'>
  <strong>"API express server"</strong>  
</h1>

### Project description
  Express JS Server API with MongoDB
   + registration, receiving a token
   + add user, view user card
   + add / view / delete news indicating the author
_____

<h2 align='center'>
  <strong>"How to use it all"</strong>  
</h2>

### Where to send requests - URL
```
84.201.175.41 | https://www.api.ayavolk.ga | https://api.ayavolk.ga

You can use http or https in request.
```

### Very briefly about requests
```
POST api.ayavolk.ga/signup                 - new user registration
POST api.ayavolk.ga/signin                 - user login and token receiving

GET  api.ayavolk.ga/users/me               - getting information about a self user

POST api.ayavolk.ga/articles               - creating a new article
GET  api.ayavolk.ga/articles               - getting information about all self articles
DEL  api.ayavolk.ga/articles/articleId     - deleting a specific article

If something went wrong, you will find out about it. The server will tell and show everything.
More on errors below.
```
_____

<h3 align='center'>
  <strong>"Tedious and long about requests and answers"</strong>  
</h3>

#### Add new user
```
POST api.ayavolk.ga/signup
  body {
          "name": "yourName",             // name       - minimun 2 && maximum 30 symbols
          "email": "yourEmail",           // email      - valid and existing email
          "password": "password"          // password   - minimun 8 symbols
       }
        
Upon successful registration, a new user is created and you will receive information about him in the response:
  {
    "data": {
        "_id": "5ef7305b49da29bd075d440f",
        "name": "Anton",
        "email": "anton11@yandex.ru",
        "__v": 0
    }
}      
```

#### User login and token receiving
```
POST api.ayavolk.ga/signin
  body {
          "email": "yourEmail",           // email      - valid and existing email
          "password": "password"          // password   - minimun 8 symbols
       }
     
Upon successful login, you will receive a token in the response:
  {
    "token":  "here will be your token"
  }  
  
Сopy token and use.
```

#### Getting information about a self user
```
GET  api.ayavolk.ga/users/me
  header: {token: 'paste your token'}

If you successfully request information from a specific user in the response you will get an object with information about it:
   {
    "data": {
        "_id": "5ef392f926860caae66c0ae1",
        "name": "Anton",
        "email": "anton@yandex.ru",
        "__v": 0
    }
}
```

#### Creating a new article
```
POST api.ayavolk.ga/articles
  header: {token: 'paste your token'}
  body {
          "keyword": "i'm keyword",         // keyword      - minimun 2 symbols, type string, required field
          "title": "i'm title",             // title        - type string, required field
          "text": "i'm text text text",     // text         - type string, required field
          "date": "25 june 2020",           // date         - type string, required field
          "source": "BBC",                  // source       - type string, required field
          "link": "https://ya.ru",          // link         - valid and existing link, required field
          "image": "http://ya.ru"           // image        - valid and existing link, required field
       }
     
If you successfully create a article in response, you will receive an object with this article:
  {
    "data": {
        "_id": "5ef731fd49da29bd075d4410",
        "keyword": "i'm keyword",
        "title": "i'm title",
        "text": "i'm text text text",
        "date": "25 june 2020",
        "source": "BBC",
        "link": "https://ya.ru",
        "image": "http://ya.ru",
        "__v": 0
    }
  } 
```

#### Getting information about all self articles
```
GET  api.ayavolk.ga/articles 
  header: {token: 'paste your token'}
     
If you successfully request information from all self articles in the response, you will receive an array with articles:
   {
    "data": [
      { info article }, 
      { info article },
      ... ,
      { ... }
    ] 
   }
```

#### Deleting a specific article
```
DEL api.ayavolk.ga/articles/:_articleId
 header: {token: 'paste your token'}
 
_articleId - article _id
     
If you successfully delete a specific article in the response, you will receive an object with information about this article:
  {
    "data": {
        "_id": "5ef5e337e12373ae911be329",
        "keyword": "i'm keyword",
        "title": "i'm title",
        "text": "i'm text text text",
        "date": "25 june 2020",
        "source": "BBC",
        "link": "https://ya.ru",
        "image": "http://ya.ru",
        "__v": 0
    }
  } 
  
The user can only delete his own card!
```
_____

<h3 align='center'>
  <strong>"What awaits you with a bad request - ERRORS"</strong>  
</h3> 

#### Bad request - error status 400

  + invalid data in request body
  
```
 Sample response text

  {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "\"name\" length must be at least 2 characters long",
      "validation": {
          "source": "body",
          "keys": [
              "name"
          ]
      }
  }
```

#### Unauthorized - error status 401

  + invalid credentials
   
```
 Sample response text
   
   {
      "message": "Неправильные почта или пароль"
   }
```
 

 
#### NotFound - error status 404

  + user not found
  + article not found when deleting
 
```
 Sample response text
   
   {
    "message": "Новостей с таким _id не существует"
   }
```

#### Conflict - error status 409

  + create an existing user
 
```
 Sample response text
   {
    "message": "Пользователь с таким email уже существует"
   }
```

#### Internal Server Error - error status 500

  + server is offended and does not want to talk
 
```
 Sample response text
   
   {
    "message": "Ошибка на сервере"
   }
```
____


#### Автор проекта: Антон Волков. :bowtie:

#### Техническое задание и ревью: ребята из Яндекса. :+1:

____
