const purchaseBtn = document.getElementById("purchase-btn");
const changeEl = document.getElementById("change-due");

let price = 19.5; // Ensure this is defined globally as per requirement
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

purchaseBtn.addEventListener("click", () => {
    let cashInput = document.getElementById("cash").value;
    let cash = parseFloat(cashInput);

    if (cashInput.trim() === "") {
        alert("Please provide an amount in the cash field.");
        return;
    } else if (isNaN(cash)) {
        alert("Please provide a valid number in the cash field.");
        return;
    }

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (Math.abs(cash - price) < 0.0001) {
        changeEl.innerText = "No change due - customer paid with exact cash";
        return;
    }

    let priceCents = Math.round(price * 100);
    let cashCents = Math.round(cash * 100);
    let changeDueCents = cashCents - priceCents;

    let cidCents = cid.map(denom => [denom[0], Math.round(denom[1] * 100)]);
    let totalCIDCents = cidCents.reduce((total, denom) => total + denom[1], 0);

    if (totalCIDCents < changeDueCents) {
        changeEl.innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    } else if (Math.abs(totalCIDCents - changeDueCents) < 1) {
        let changeDetails = calculateChange(priceCents, cashCents, true);
        if (changeDetails === "INSUFFICIENT_FUNDS") {
            changeEl.innerText = "Status: INSUFFICIENT_FUNDS";
        } else {
            changeEl.innerText = "Status: CLOSED " + changeDetails;
        }
        return;
    }

    let changeDetails = calculateChange(priceCents, cashCents, false);
    if (changeDetails === "INSUFFICIENT_FUNDS") {
        changeEl.innerText = "Status: INSUFFICIENT_FUNDS";
    } else {
        changeEl.innerText = "Status: OPEN " + changeDetails;
    }
});

const calculateChange = (priceCents, cashCents, isClosed) => {
    let changeDueCents = cashCents - priceCents;
    let change = [];

    let changeArr = [
        ["ONE HUNDRED", 10000],
        ["TWENTY", 2000],
        ["TEN", 1000],
        ["FIVE", 500],
        ["ONE", 100],
        ["QUARTER", 25],
        ["DIME", 10],
        ["NICKEL", 5],
        ["PENNY", 1]
    ];

    let cidCents = cid.map(denom => [denom[0], Math.round(denom[1] * 100)]);

    for (let i = 0; i < changeArr.length; i++) {
        let coinName = changeArr[i][0];
        let coinValue = changeArr[i][1];
        let available = cidCents.find(denom => denom[0] === coinName)[1];

        if (available <= 0 || changeDueCents < coinValue) continue;

        let maxPossible = Math.min(Math.floor(changeDueCents / coinValue), Math.floor(available / coinValue));
        if (maxPossible < 1) continue;

        let amountToUse = maxPossible * coinValue;
        change.push(`${coinName}: $${(amountToUse / 100).toFixed(2).replace(/\.00$/, '')}`);
        changeDueCents -= amountToUse;
    }

    if (changeDueCents > 0) {
        return "INSUFFICIENT_FUNDS";
    } else {
        return change.join(' ');
    }
};