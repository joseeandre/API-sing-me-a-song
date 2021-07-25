import { Request, Response } from "express";

export function test(req: Request, res: Response) {
  res.send("OK!");
}
