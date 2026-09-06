import express from 'express';
import {runOrchestration} from './orchestrator';
import type {OrderRequest} from './types';

const router = express.Router();

router.post('/evaluate', express.json(), async (req, res) => {
  try {
    const order = req.body as OrderRequest;
    const report = await runOrchestration(order);
    res.status(200).json(report);
  } catch (error) {
    console.error('Sourcing evaluation error:', error);
    res.status(500).json({error: 'Failed to evaluate sourcing request.'});
  }
});

export default router;
