import * as dotenv from 'dotenv';
import { Default_Port } from './constants/server/Server.ts';
import { server } from './server/Server.ts';

dotenv.config();

const PORT = Number(process.env.PORT) || Default_Port;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
