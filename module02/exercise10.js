let circle = {}
circle.x = 0
circle.y = 0
circle.radius = 100
circle.area = function () {
    return Math.PI * this.radius ** 2;
}
console.log(circle)
console.log(circle.x)
console.log(circle.y)
console.log(circle.radius)
console.log(circle['x'])
console.log(circle["y"])
console.log(circle['radius'])
attribute = "radius"
console.log(circle[attribute])
for (let member in circle) {
    if (typeof (circle[member]) !== 'function') {
        let value = circle[member];
        console.log(`circle[${member}]: ${value}`)
    }
}