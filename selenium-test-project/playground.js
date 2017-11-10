var a = [2, 3, 1, 5, 3, 2];

// for (var i = 0; i < countriesList.length; i++) {

function firstDuplicate(a) {
    for (var i = 0; i < a.length-1; ++i){
        for(var z = i+1; z < a.length; z++){
            if(a[i] === a[z] || i > z) {
                return a[i];
            }
        }
    }
    return (-1);
}


//firstDuplicate(a);
console.log(firstDuplicate(a));

