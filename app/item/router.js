import { Router } from "express";
import controller from "./controller";

const router = new Router();

router.get("/", async (_, res) => {
  const items = await controller.index();

  res.json(items);
});

router.post("/", async (req, res) => {
  try {
    if (req.isAuth) {
      const newItem = req.body;

      const id = await controller.create(newItem);

      res.json({ id });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.isAuth) {
      const { id } = req.params;
      const updatedItem = req.body;
      await controller.update(id, updatedItem);

      res.json({ id });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (req.isAuth) {
      const { id } = req.params;
      await controller.delete(id);

      res.json({ id });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
