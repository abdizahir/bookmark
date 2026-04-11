import express from 'express';
import { addArchive, createBookmark, deleteBookmark, editBookmark, getBookmarks, removeArchive, unpinBookmark, visitBookmark } from '../controller/bookmark.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get("/", getBookmarks);
router.post('/add-bookmark', createBookmark);
router.patch('/:id/archive', addArchive)
router.patch("/:id/unarchive", removeArchive);
router.patch('/:id/edit-bookmark', editBookmark);
router.delete('/delete-bookmark/:id', deleteBookmark);
router.post("/:id/visit", visitBookmark);
router.post("/:id/unpin", unpinBookmark);

export default  router;