const Queue   = require('bee-queue')

const cookQueue = new Queue('cook')
const serveQueue = new Queue('serve')

const availableProducts = [
    { name: 'pizza', timeToBeReady: 5000 },
    { name: 'hamburger', timeToBeReady: 3000 },
    { name: 'juice', timeToBeReady: 1000 }
]

const placeOrder = (order) => {
    return cookQueue.createJob(order).save()
}

cookQueue.process(1, (job, done) => {
    const { products } = job.data
    let readyProducts = 0
    var totalProducts = products.length
    
    for(let i in products) {
        let product = availableProducts.filter(e=>e.name == products[i].name)[0]

        const productDoesNotExists = !product

        if( productDoesNotExists ) {
            console.log('product',i,' not available yet.');
            readyProducts++
        } else {
            product.ammount = products[i].ammount
            console.log('🍳 preparing', product.ammount, '*', product.name, 'wait for', (product.timeToBeReady/1000) * product.ammount, 'secs');
            var start = new Date().getTime();   
            setTimeout(()=>{
                readyProducts++
                console.log('product', parseInt(i)+1, product.name, 'is ready |', readyProducts,'of', totalProducts, 'products ready.');
                // If in last product mark task as done
                if(totalProducts === readyProducts) {
                    console.log('Order preparing finished.');
                    done()
                    var end = new Date().getTime();
                    var time = end - start;
                    console.log('----------------------------------\nTime to prepare:', time/1000, 'secs\n----------------------------------');
                }
            }, product.timeToBeReady * product.ammount)
        }
    }
    console.log('----------------------------------')
})

module.exports.placeOrder = placeOrder;