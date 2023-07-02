export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function emulateResponse(_result = true): Promise<boolean>  {
    await sleep(4000);
    return _result;
}

export function pad(num: number, size: number):string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}