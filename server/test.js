let a = 'javascript';
let vowels = ['a','e','i','o','u'];
let count = 0;
for (let i = 0; i < a.length; i++) {
    if(vowels.includes(a[i])){
       console.log(a[i],++count);
    }
}



let word = 'asyncff';
let freq = {};

for (let i = 0; i < word.length; i++) {
    if(freq[word[i]]) freq[word[i]]++
    else freq[word[i]] = 1
}
console.log('Done With for loop',freq);


// for of loop
// for (const ch of word) {
//     freq[ch] = (freq[ch] || 0) + 1
// }
// console.log(freq);


// for loop
// for(let i = 0; i < word.length; i++){
//     if(freq[word[i]]) {
//         freq[word[i]]++
//     }else{
//         freq[word[i]] = 1;
//     }
// }
// console.log(freq);

