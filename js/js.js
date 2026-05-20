document.addEventListener("DOMContentLoaded", function () {
    let kosar = [];

    const gombok = document.querySelectorAll(".add-to-cart");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");
    const cartPanel = document.getElementById("cartPanel");
    const overlay = document.getElementById("overlay");

    document.getElementById("cartOpenBtn").onclick = function () {
        cartPanel.style.display = "block";
        overlay.style.display = "block";
    };

    document.getElementById("cartCloseBtn").onclick = function () {
        cartPanel.style.display = "none";
        overlay.style.display = "none";
    };

    overlay.onclick = function () {
        cartPanel.style.display = "none";
        overlay.style.display = "none";
    };

    gombok.forEach(function (gomb) {
        gomb.onclick = function () {
            const termek = gomb.parentElement;

            const nev = termek.getAttribute("data-name");
            const ar = Number(termek.getAttribute("data-price"));

            kosar.push({
                nev: nev,
                ar: ar
            });

            kosarFrissit();
        };
    });

    function kosarFrissit() {
        cartItems.innerHTML = "";

        let osszeg = 0;

        kosar.forEach(function (termek, index) {
            osszeg += termek.ar;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <p>${termek.nev} - ${termek.ar} Ft</p>
                    <button onclick="torol(${index})">Törlés</button>
                </div>
            `;
        });

        cartTotal.innerText = osszeg + " Ft";
        cartCount.innerText = kosar.length;
    }

    window.torol = function (index) {
        kosar.splice(index, 1);
        kosarFrissit();
    };

    document.getElementById("clearCartBtn").onclick = function () {
        kosar = [];
        kosarFrissit();
    };

    document.getElementById("orderBtn").onclick = function () {
        if (kosar.length === 0) {
            alert("A kosár üres!");
        } else {
            alert("Sikeres rendelés!");
            kosar = [];
            kosarFrissit();
        }
    };
});