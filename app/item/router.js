import { Router } from "express";
import controller from "./controller";

const router = new Router();

router.get("/", async (_, res) => {
  const items = await controller.index();

  res.json(items);
});

router.post("/", async (req, res) => {
  try {
    const newItem = req.body;
    const id = await controller.create(newItem);

    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = req.body;
    await controller.update(id, updatedItem);

    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await controller.delete(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
