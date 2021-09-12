import axios from "axios";

const wait = (ms:number) => new Promise((ok)=>setTimeout(() => {ok(null)}, ms));
const requestURL = 'http://localhost:4000/api/dev-test/2';
const numberOfRequests = 5;
const batchSize = 3;
const results = Array<Promise<void>>(numberOfRequests*batchSize);
(async () => {
    for(let j = 0; j < numberOfRequests; ++j) {
        await wait(2000);
        for(let i = 0; i < batchSize; ++i) {
            const idx = j*batchSize + i;
            results[idx] = axios.post(requestURL, {
                id: 1,
                counter: idx
            });
        }
    }
    
    Promise.all(results)
    .then(x => {
        console.log(JSON.stringify(x));
    }).catch(x => {
        console.log(JSON.stringify(x));
    })
})();