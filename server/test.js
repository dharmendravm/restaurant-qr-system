// // let a = 'javascript';
// // let vowels = ['a','e','i','o','u'];
// // let count = 0;
// // for (let i = 0; i < a.length; i++) {
// //     if(vowels.includes(a[i])){
// //        console.log(a[i],++count);
// //     }
// // }



// // let word = 'asyncff';
// // let freq = {};

// // for (let i = 0; i < word.length; i++) {
// //     if(freq[word[i]]) freq[word[i]]++
// //     else freq[word[i]] = 1
// // }
// // console.log('Done With for loop',freq);

// import fs from "fs";

// const base64 =
// "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"; 


// const buffer = Buffer.from(base64, "base64");

// fs.writeFileSync("qr.png", buffer);

// console.log("QR image saved as qr.png");