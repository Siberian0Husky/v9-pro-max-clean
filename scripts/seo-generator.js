const products = [
"M12 connector",
"M8 connector",
"industrial plug",
"automation cable"
];

const pages = [];

for(const p of products){
  pages.push(`${p}-supplier`);
  pages.push(`${p}-factory-china`);
  pages.push(`${p}-wholesale-price`);
}

console.log(pages);