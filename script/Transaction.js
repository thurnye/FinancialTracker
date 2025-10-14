const BASE_URL = "https://apisandbox.openbankproject.com/obp/v5.1.0";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyIiOiIifQ.h2VhXhF5WPriO1pSlHlFLJG7fXreFeit3IShqiuKvtY";
const ACCOUNT_ID = "52e0943c-2139-4b17-8809-8aaabb43b6b6";

async function fetchTransactions() {
  try {
    const res = await fetch(`${BASE_URL}/my/accounts/${ACCOUNT_ID}/transactions`, {
      headers: {
        Authorization: `DirectLogin token=${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // console.log(JSON.stringify(data, null, 2));

    data.transactions?.forEach((tx) => {
      // console.log(
        `${tx.details.completed} | ${tx.other_account.holder.name} | ${tx.details.value.amount} ${tx.details.value.currency} | ${tx.details.description}`
      );
    });
  } catch (err) {
    console.error("Error fetching transactions:", err);
  }
}

fetchTransactions();
