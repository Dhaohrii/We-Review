import express, { Request, Response } from 'express';
import { getAllShop, getShopById, addShop, updateShop, deleteShop, getByCategory } from '../controllers/shop';

const router = express.Router();

router.get('/', (req: Request, res: Response) => getAllShop(req, res));
router.get('/:id', (req: Request, res: Response) => getShopById(req, res));
router.get('/category/:category', (req: Request, res: Response) => getByCategory(req, res));
router.post('/', (req: Request, res: Response) => addShop(req, res));
router.put('/:id', (req: Request, res: Response) => updateShop(req, res));
router.delete('/:id', (req: Request, res: Response) => deleteShop(req, res));

export default router;

