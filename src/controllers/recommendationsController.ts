import { recommendationsRepository } from "../repositories/recommendationsRepository";
import { Request, Response } from "express";
import { middleRepository } from "../repositories/middleRepository";
import { recommendationSchema } from "../schemas/recommendationsSchema";
import { recommendationsService } from "../services/recommendationsService";

export default class genresController {
  async createSong(req: Request, res: Response) {
    const validation = recommendationSchema.validate(req.body).error;
    if (validation !== undefined) return res.sendStatus(400);
    const RecRepository = new recommendationsRepository();
    const MiddleRepository = new middleRepository();
    const genres = req.body.genres;

    try {
      const songId = await RecRepository.newSong(
        req.body.name,
        req.body.youtubeLink
      );
      for (let i = 0; i < genres.length; i++) {
        await MiddleRepository.newSongGenre(genres[i], songId.rows[0].id);
      }

      return res.status(201).json({
        message: "song created",
        id: songId.rows[0].id
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "error on create song",
      });
    }
  }

  async addVote(req: Request, res: Response) {
    const RecRepository = new recommendationsRepository();
    const song = req.params.id;

    try {
      const score = await RecRepository.getScore(parseInt(song));
      console.log(score);
      await RecRepository.updateScore(score + 1, parseInt(song));
      return res.status(200).json({
        message: "vote success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "error on vote",
      });
    }
  }

  async removeVote(req: Request, res: Response) {
    const RecRepository = new recommendationsRepository();
    const song = req.params.id;

    try {
      const score = await RecRepository.getScore(parseInt(song));
      console.log(score);
      await RecRepository.updateScore(score - 1, parseInt(song));
      return res.status(200).json({
        message: "vote success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "error on vote",
      });
    }
  }

  async getRandom(req: Request, res: Response) {
    const RecService = new recommendationsService();
    try {
      const randomSongs = await RecService.getRandomSong();

      if (!randomSongs) {
        return res.sendStatus(404);
      }

      res.send(randomSongs);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async getTopSongs(req: Request, res: Response) {
    const RecService = new recommendationsService();
    try {
      const amount = parseInt(req.params.amount);

      if (!amount) {
        return res.sendStatus(400);
      }

      const topSongs = await RecService.getTopSongs(amount);

      res.send(topSongs);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}
