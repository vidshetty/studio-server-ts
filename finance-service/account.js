console.log("loaded");

const form = document.getElementById("form");
const date = document.getElementById("date");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");

const getCategories = async () => {

    try {
        const res = await fetch("/finance/accounts/category", { method: "GET" });
        const data = await res.json();
        for (let i=0; i<data.length; i++) {
            const option = document.createElement("option");
            option.value = data[i];
            option.text = data[i];
            category.appendChild(option);
        }
    }
    catch(e) {
        return;
    }

};

const submit = async (e) => {
    e.preventDefault();
    try {
        const date_data = date.value;
        const amount_data = amount.value;
        const description_data = description.value;
        const category_data = category.value;
        await fetch("/finance/accounts/entry", {
            method: "POST",
            body: JSON.stringify({
                date: date_data,
                amount: amount_data,
                description: description_data,
                category: category_data
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        location.reload();
    }
    catch(e) {
        return;
    }
};


(async () => {

    await getCategories();

    form && form.addEventListener("submit", submit);

})();