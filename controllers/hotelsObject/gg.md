{
"launguage": "EN",
"status": ["on verification", "active", "not active", "deleted"],
"activeLocationId": "1234567890123456789",
"country": "Ukraine",
"state": "Dnipropetrovsk reg",
"city": "Dnipro",
"district": "Central",
"district1": "maybe one more location.",
"type": {
"type": "Flat",
"stars": 1 ///optional
},
"objectName": "Hilton", //chenge key
"address": {
"country": "Ukraine",
"state": "Dnipropetrovsk",
"city": "Dnipro",
"district": "Central",
"street": "Soborna",
"house": "18",
"apartment": "1a", // not require
"zipCode": "hjhk", // zipcode
"phone": "+380569123456782",
"email": "hostelDnipro@gmail.com"
},
"description": "mknlnknknkkkbkbknjknjknk",
"photos": ["www.photo.com.ua", "www.photo1.com.ua", "www.photo2.com.ua"],
"time": {
"checkin": "20.09.2022 11.30pm",
"checkout": "21.09.2022 12.00am"
},
"services": ["id", "id", "id"],
"payments": ["kkkk", "lll", "LLLL"],
"locations": {
"dist": "Podil",
"city": "Kiev",
"state": "Kiev region",
"country": "Ukraine"
//need remove video
"video": "www.youtebe.hotel.Hilton",
"documents": ["", ""], //saved documents
"selfi": []
}

[
{"id":"1", "type":"Mieszkania"},
{"id":"2", "type":"Hostel"},
{"id":"3", "type":"Hotel apartamentowy"},
{"id":"4", "type":"Mały dom"},
{"id":"5", "type":"Willa"},
{"id":"6", "type":"Szalet"},
{"id":"7", "type":"Dom wakacyjny"},
{"id":"8", "type":"Hotel kapsułowy"},
{"id":"9", "type":"Pokój w mieszkaniu z właścicielami"},
{"id":"10", "type":"Pokój w domie z właścicielami"},
{"id":"11", "type":"Hotel"},
{"id":"12", "type":"Hotel", "stars": "1"},
{"id":"13", "type":"Hotel", "stars": "2"},
{"id":"14", "type":"Hotel", "stars": "3"},
{"id":"15", "type":"Hotel", "stars": "4"},
{"id":"16", "type":"Hotel", "stars": "5"},
{"id":"17", "type":"Hotel", "stars": "6"},
{"id":"18", "type":"Guest House"},
{"id":"19", "type":"Motel"},
{"id":"20", "type":"Hotel wypoczynkowy"}
]

{
"language":"EN",
"status": "on verification",
"type":{
"\_id":"2",
"type":"Апарт - отель"},
"objectName":"Kurort",
"address":{
"country":"q",
"state":"q",
"city":"q",
"street":"q",
"house":"q",
"apartment":"q",
"zipCode":"q",
"phone":"q",
"email":"q"
},
"description": "Расскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\nРасскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\nРасскажите про ваш объект подробнее\n
Расскажите про ваш объект подробнее\nРасскажите про ваш объект подробнее",
"photos":["blob:http://localhost:3000/f3f94c43-ea29-4091-81b5-e8698e8ba1e4"],
"time":{"checkin":"20:26","checkout":"20:26"},
"services":[
{"id":"34","service":"Аренда автомобилей"},
{"id":"39","service":"Конференц зал"}],
"payments":[
{"id":"0","type":"cash","icon":"cash","text":"Оплата на месте наличными"},
{"id":"4","type":"American Express","icon":"JCB","text":"Оплата на месте картой American Express"},
{"id":"2","type":"UnionPay","icon":"JCB","text":"Оплата на месте картой UnionPay"}],
"location":{
"\_id":"3",
"district":"Подол",
"city":"Киев",
"state":"Киевская область",
"country":"Украина"}
}

dist {
"\_id": "251331313",
"districtName":"Podil",
"cityName": "Kyiv",
"stateName": "Kyivski",
"country": "ukraine"
}

city{
"\_id": "kjknknjk",
"cityName": "Kyiv",
"stateName": "Kyivski",
"countryName": "ukraine"
}

{
1.typeOfObject: hotel, house
2.amount of bedrooms:""
fistBedromm{  
 doubleBed:[]
singleDeb:[]
} 3. typeOfbed:{
doubleBed:[]
singleDeb:[]
}
secondBedroom{
doubleBed:[]
singleDeb:[]
}
4.roomservices: [] Where save
5.animals:[], if without animals
6.description:"", min(300)max(500)
7.uniqueNumber
8.totalSquiere
9.roomSmoking
9.photo:[]
}

1. add booking Option (hotels, hostels) - ready
2. services for booking options - ready
3. Cloudinary - ready
