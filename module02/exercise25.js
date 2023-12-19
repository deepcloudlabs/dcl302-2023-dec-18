let circle1 = {
    x: 0,
    y: 0,
    radius: 100,
    color: {
        red: 100,
        green: 200,
        blue: 218
    },
    paint: {
        style: "CONTINUOUS",
        thickness: 4
    }
}

let circle2 = {...circle1} // shallow cloning
circle2.color = {...circle1.color}
circle2.paint = {...circle1.paint}
circle2.paint.thickness++;
circle2.color.red++;
circle2.color.green++;
circle2.color.blue++;
console.table(circle1)
console.table(circle2)