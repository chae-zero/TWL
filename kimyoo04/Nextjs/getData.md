```js
export async function getData() {
  const filepath = path.join(process.cwd(), "data", "파일명.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);
  return data;
}
```
