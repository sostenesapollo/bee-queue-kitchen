#### Using bee-queue to create a kitchen
 - [x] Each product have a time to be ready
 - [x] The orders are created by express
 - [x] If the preparation of some product fail, the order preparation does not finishes and it keeps in the queue.

#### To run this project you need to run redis

```docker run -p 6379:6379 redis:alpine```


### Available products

```
const availableProducts = [
    { name: 'pizza', timeToBeReady: 5000 },
    { name: 'hamburger', timeToBeReady: 3000 },
    { name: 'juice', timeToBeReady: 1000 }
]
```

#### To create a new order send POST to http://localhost:PORT/place_order
```
 {
	"order": {
		"products": [
			{ "name": "pizza", "ammount": 1 },
			{ "name": "juice", "ammount": 1 }
		]
	}
}
```