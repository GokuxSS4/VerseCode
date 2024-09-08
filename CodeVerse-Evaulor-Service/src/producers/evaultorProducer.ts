import { evalution_queue } from "../utils/constant";
import evalutionQueue from "../queues/evalutionQueue";

export default async function(payload: Record<string, unknown>) {
    await evalutionQueue.add(evalution_queue, payload);
}