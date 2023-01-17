import express from 'express';
import messagesRouter from "./routers/messages";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
};

run().catch(console.error);
