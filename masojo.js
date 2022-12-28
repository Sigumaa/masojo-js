const readline = require('readline');
const dotenv = require('dotenv');

dotenv.config();

const server = process.env.SERVER ?? '';
const token = process.env.TOKEN ?? '';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
rl.question('文字列を入力してください: ', (str) => {
    send(str);
    rl.close();
});

async function sendRequest(c){
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetch(server + token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `status=${encodeURIComponent(c)}&visibility=unlisted`,
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
}

async function change(text) {
    const response = await fetch('https://api.ojosama.jiro4989.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    return await response.json();
}

async function send(text) {
    const { Result } = await change(text);
    console.log("入力された文字列: " + text)
    console.log("変換された文字列: " + Result)
    await sendRequest(Result);
}