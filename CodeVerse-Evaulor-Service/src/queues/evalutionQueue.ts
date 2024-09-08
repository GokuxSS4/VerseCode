import { Queue } from "bullmq";
import redisConfig from "../config/redisConfig";
import { evalution_queue } from "../utils/constant";

export default new Queue(evalution_queue,{connection:redisConfig});