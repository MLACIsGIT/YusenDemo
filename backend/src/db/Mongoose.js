import mongoose from 'mongoose';
import { setBaseData } from '../../demoData/setDatabase';

export async function connectDb() {
  if (mongoose.connected) {
    return;
  }

  await mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await setBaseData();
}

export async function disconnect() {
  await mongoose.disconnect();
}
