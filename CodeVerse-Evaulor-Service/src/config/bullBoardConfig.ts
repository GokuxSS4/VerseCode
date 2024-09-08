import {createBullBoard} from '@bull-board/api';
import {BullMQAdapter} from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import submissionQueue from '../queues/submissionQueue';
import evalutionQueue from '../queues/evalutionQueue';

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(submissionQueue),new BullMQAdapter(evalutionQueue)],
  serverAdapter,
});