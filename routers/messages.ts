import express from 'express';
import {promises as fs} from 'fs';
import {Message} from "../types";

const messagesRouter = express.Router();

const fileName = './messages/';
const path = 'messages';
let allMessages: Message[] = [];

messagesRouter.get('/', async (req, res) => {
  const run = async () => {
    const files = await fs.readdir(path);
    files.forEach(file => {
      const loadMessage = async (path: string) => {
        allMessages = []
        const fileContents = await fs.readFile(path);
        const message = fileContents.toString();
        const fileObject = JSON.parse(message) as Message
        allMessages.push(fileObject);
      }

      loadMessage(path + '/' + file);
    });
  };

  run().catch(console.error);

  res.send(allMessages.slice(-5));
});

messagesRouter.post('/', async (req, res) => {
  const today = new Date();

  const message: Message = {
    message: req.body.message,
    dateTime: today.toISOString(),
  };

  const run = async () => {
    try {
      await fs.writeFile(fileName + today.toISOString() + '.txt', JSON.stringify(message));
      console.log('File was saved!');
    } catch (err) {
      console.error(err);
    }
  };

  await run().catch(console.error);

  res.send(message);
});

export default messagesRouter;