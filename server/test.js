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

import os from 'os'

    console.log(os.networkInterfaces()["Wi-Fi"]);

    const data = os.networkInterfaces()["Wi-Fi"];
    let ipAddress = null;
    for (const el of data) {
      if (el.family === "IPv4") ipAddress = el.address;
    }
    console.log(ipAddress);