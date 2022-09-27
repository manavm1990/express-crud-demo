import { Router } from "express";
import controller from "./controller";

const router = new Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    const id = await controller.create(newUser);

    res.json({ id });
  } catch (error) {
    if (error.message.includes("exists")) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await controller.login(username, password);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
