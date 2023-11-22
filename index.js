import http from "node:http";
import fs from "node:fs/promises";

const PORT = 8080;

http
   .createServer(async (req, res) => {
      if (req.method === "GET" && req.url === "/comedians") {
         try {
            const data = await fs.readFile("comedians.json", "utf8");
            res.writeHead(200, {
               "Content-Type": "text/json; charset=utf8",
               "Access-Control-Allow-Orirgin": "*",
            });
            res.end(data);
         } catch (error) {
            res.writeHead(500, {
               "Content-Type": "text/plain; charset=utf8",
            });
            res.end(`Ошибка сервера: ${error}`);
         }
      } else {
         res.writeHead(404);
         res.end("Not found");
      }
   })
   .listen(PORT);
console.log(`Сервер запущен на http://localhost:${PORT}`);
