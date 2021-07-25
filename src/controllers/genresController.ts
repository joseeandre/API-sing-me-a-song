import { genresRepository } from "../repositories/genresRepository";
import { Request, Response } from "express";
import { genreSchema } from "../schemas/genresSchema";

export default class genresController {
  async createGenre(req: Request, res: Response) {
    const validation = genreSchema.validate(req.body).error;
    if(validation !== undefined) return res.sendStatus(400);
    const GenresRepository = new genresRepository()

    try {
      const insert = await GenresRepository.newGenre(req.body.name);

      return res.status(201).json({
        message: "genre created",
        id: insert.rows[0].id
      });
    } catch (err) {
      console.log(err)
      return res.status(404).json({
        message: "error on create genre",
      });
    }
  }

  async showGenres(req: Request, res: Response) {
    const GenresRepository = new genresRepository()
    const id = req.params.id
    try {
      const response = await GenresRepository.getAllGenres()

      return res.status(200).json(response);
    } catch (err) {
      console.log(err)
      return res.status(404).json({
        message: "error on get genres",
      });
    }
  }
}
