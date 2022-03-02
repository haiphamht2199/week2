const getProducts = async () => {
 try {
  const results = await fetch("./data/log.json");
  const data = await results.json();
  const devices = data.Logs;
  return devices;
 } catch (err) {
  console.log(err);
 }
};
const divece = document.querySelector(".log");
window.addEventListener("DOMContentLoaded", async function () {
 var nas = localStorage.getItem('name');
 var password = localStorage.getItem('password');
 if (!nas || !password) {
  window.location.href = "http://127.0.0.1:5500/signin.html?";
 }
 const products = await getProducts();
 const resuilt = products.slice(0, 8);
 displayProductItems(resuilt);
 document.getElementsByClassName('spanTotal1')[0].innerText = products.length;
});
const displayProductItems = items => {
 let displayProduct = items.map(divice => `
 <tr>
          <td>${divice.id}</td>
          <td>${divice.name}</td>
          <td>${divice.action}</td>
          <td>${divice.date}</td>
         </tr>
 `);
 displayProduct = displayProduct.join("");
 if (divece) {
  divece.innerHTML = displayProduct;
 }
}
async function Pagination(x) {
 const products = await getProducts();
 var page = x;
 var perPage = 8;
 var start = (page - 1) * perPage;
 var end = page * perPage;
 const resuilt = products.slice(start, end);
 console.log(resuilt)
 displayProductItems(resuilt);

}
async function Search() {
 var searchInput = document.querySelector('.inputSearch');
 var check = false;
 const products = await getProducts();
 const resuilt = [];
 let txtSearch = searchInput.value.toLowerCase().trim();
 if (txtSearch) {
  products.forEach(item => {
   if (item.name.toLowerCase().includes(txtSearch)) {
    check = true;
    resuilt.push(item);
    // displayProductItems(resuilt);

   }

  });
  if (!check) {
   displayProductItems([]);
   document.getElementsByClassName('spanTotal1')[0].innerText = "0";
   return
  }
 } else {

  const resuilt = products.slice(0, 8);
  displayProductItems(resuilt);
  document.getElementsByClassName('spanTotal1')[0].innerText = products.length;
  return
  // displayProductItems(products);
 }
 displayProductItems(resuilt);
 document.getElementsByClassName('spanTotal1')[0].innerText = resuilt.length;

}