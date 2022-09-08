// 1. Создать функцию, генерирующую шахматную доску. 
// При этом можно использовать любые html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H. (использовать createElement / appendChild)
'use strict';
const settings = {
    rowCount: 10,
    colCount: 10,
    darkColor: '#8B0000',
    whiteColor: '#FFFAF0'
};

const chessBoard = {
    settings,
    containerElement: document.getElementById('chessBoard'),
    cellElements: null,
    drawing() {
        this.initCells();
        this.render();
    },

    initCells() {
        this.cellElements = [];
        for (let row = 0; row < this.settings.rowCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);


            for (let col = 0; col < this.settings.colCount; col++) {
                const cell = document.createElement('td');
                trElem.appendChild(cell);

                this.cellElements.push(cell);
            }
        }
    },


    render() {
        for (let i = 0; i < 9; i++) {
            const numCellTop = document
                .querySelector(`tr:first-child`)
                .querySelector(`td:nth-child(${i + 1})`);
            const numCellDown = document
                .querySelector(`tr:last-child`)
                .querySelector(`td:nth-child(${i + 1})`);
            if (i == 0) continue;
            const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            numCellTop.textContent += abc[i - 1];
            numCellDown.textContent += abc[i - 1];
        }

        for (let i = 0; i < 9; i++) {
            const abcCellLeft = document
                .querySelector(`tr:nth-child(${i + 1})`)
                .querySelector(`td:first-child`);
            const abcCellRight = document
                .querySelector(`tr:nth-child(${i + 1})`)
                .querySelector(`td:last-child`);
            if (i == 0) continue;
            abcCellRight.textContent += 9 - i;
            abcCellLeft.textContent += 9 - i;
        }


        this.cellElements.forEach(cell => cell.style.backgroundColor = this.settings.whiteColor);


        for (let a = 1, b = 1; a < 10; a++) {
            for (b = 1; b < 10; b++) {
                if (a == 1 || b == 1) continue;
                if ((a % 2 != 0 && b % 2 == 0) || (b % 2 != 0 && a % 2 == 0)) {
                    const darkCells = document
                        .querySelector(`tr:nth-child(${a})`)
                        .querySelector(`td:nth-child(${b})`);
                    darkCells.style.backgroundColor = this.settings.darkColor;
                }
            }
        }
    }
}

chessBoard.drawing()


// 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// 2.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

const goods = {
    productList: [
        { name: 'sadness', amount: 2, price: 10 },
        { name: 'love', amount: 1, price: 100500 },
        { name: 'banana', amount: 1, price: 50 },
        { name: 'anger', amount: 0, price: 200 },
        { name: 'tear', amount: 65, price: 1.5 },
    ],

    //     productList: [
    //         { name: 'apple', amount: 0, price: 70 },
    //         { name: 'pear', amount: 0, price: 100 },
    //     ],

    countedAmount: null,
    basketPrice: null,

    showBasket() {
        const nameBasket = document.querySelector('#basket');
        nameBasket.insertAdjacentHTML("afterbegin", '<h1>Корзина</h1>');
        const whatInBasket = document.createElement('p');
        this.countBasketPrice();
        this.countAmount();
        if (this.basketPrice != 0) {
            nameBasket.insertAdjacentHTML("beforeend", `<p>В корзине: ${this.countedAmount} товаров на сумму ${this.basketPrice} рублей.</p>`);
        }
        else { nameBasket.insertAdjacentHTML("beforeend", `<p>Корзина пуста.</p>`); }
    },

    countBasketPrice() {
        const initialValue = 0;
        this.basketPrice = this.productList.reduce(function (acc, count) {
            return acc + count.amount * count.price;
        }, initialValue);
        return this.basketPrice;
    },

    countAmount() {
        const initialValue = 0;
        this.countedAmount = this.productList.reduce(function (acc, count) {
            return acc + count.amount;
        }, initialValue);
        return this.countedAmount;
    }
}

// console.log(goods.countBasketPrice());
// console.log(goods.countAmount());
goods.showBasket();

// 3*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
// 3.1. Создать массив товаров (сущность Product);
// 3.2. При загрузке страницы на базе данного массива генерировать вывод из него.
// HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.