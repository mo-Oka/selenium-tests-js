// var a = [2, 3, 1, 5, 3, 2];
//
// // for (var i = 0; i < countriesList.length; i++) {
//
// function firstDuplicate(a) {
//     for (var i = 0; i < a.length-1; ++i){
//         for(var z = i+1; z < a.length; z++){
//             if(a[i] === a[z] || i > z) {
//                 return a[i];
//             }
//         }
//     }
//     return (-1);
// }


//firstDuplicate(a);
//console.log(firstDuplicate(a));

// ---


// const a = [1, 1, 2, 2, 3, 3, 3, 4, 5, 5]; //5
// // const a = [1, 1, 1, 2, 2, 3, 3, 4, 5, 5]; //5
// // const a = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]; //4
// // const a = [0, 0, 0, 2, 3, 3, 3, 4, 5, 5]; //5
// // const a = [1, 1, 1, 1, 1, 1, 1, 1, 1]; //9
// const a = [0, 0, 0, 0, 0]; //5
// const a = [1, 1, 3, 3, 3, 4, 5, 5, 5, 5]; //5
const a = [5, 5, 5, 5]; //5
const k = 2;
// // const k = 0;
// // const k = 1;
// const k = 10;
//
function solution(A, K) {
    var n = A.length;
    var best = 0;
    var count = 1;
    for (var i = 0; i < n - 1; i++) {
        if (A[i] == A[i + 1])
            count = count + 1;
        else
            count = 0;
        if ((count + (K > n-i ? n-i : K) )> best)
            best = count + (K > n-i ? n-i : K);
    }
    var result = best;

    return result;
}

console.log(solution(a, k));

// ---

// const n = 955 ;
//
// function solution(n) {
//     d = new Array(30);
//     l = 0;
//     while (n > 0) {
//         d[l] = n % 2;
//         n = Math.floor(n / 2);
//         l += 1;
//     }
//     for (p = 1; p < 1 + l; ++p) {
//         ok = true;
//         for (i = 0; i < l - p; ++i) {
//             if (d[i] != d[i + p]) {
//                 ok = false;
//                 break;
//             }
//         }
//         if (ok) {
//             return p;
//         }
//     }
//     return -1;
// }
