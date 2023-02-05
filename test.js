let x = 4
let y = x
y = 3

console.log(x)
console.log(y)


function ops(){
    for(let i = 0; i < 30; i++){
        console.log(i)
        if (i === 15){
            break;
        }
    }
    console.log('ohhh')
}

for(let i = 0; i < 3; i++){
    ops()
}
