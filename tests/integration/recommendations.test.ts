import supertest from "supertest";
import app from "../../src/app";
import "../../src/setup";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach(async () => {
  await clearDatabase();
});

function exampleGenre() {
  return {
    name: "teste",
  };
}

async function createGenre() {
  const genre = await exampleGenre();
  const result = await supertest(app).post("/genres").send(genre);
  const body = {
    name: "Teste",
    youtubeLink: "http://www.youtube.com",
    genres: [result.body.id],
  };
  return body;
}

describe("POST /recommendations", () => {
  it("return status 400 for a invalid recommendation.", async () => {
    const body = {
      name: 3,
      youtubeLink: "www.youtube.com",
      genres: [1],
    };
    await createGenre()
    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toBe(400);
  });

  it("return status 201 for a valid recommendation.", async () => {
    const body = await createGenre()

    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toBe(201);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("return status 400 for a invalid params.", async () => {
    const songId = 10;

    const response = await supertest(app).post(
      `/recommendations/${songId}/upvote`
    );

    expect(response.status).toBe(400);
  });

  it("return status 200 for a valid song id.", async () => {
    const body = await createGenre()
    const newSong = await supertest(app)
      .post("/recommendations")
      .send(body);

    const newSongId = newSong.body.id;

    const response = await supertest(app).post(
      `/recommendations/${newSongId}/upvote`
    );

    expect(response.status).toBe(200);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("return status 400 for invalid params.", async () => {
    const songId = 10;

    const response = await supertest(app).post(
      `/recommendations/${songId}/downvote`
    );

    expect(response.status).toBe(400);
  });

  it("return status 200 for a valid song id.", async () => {
    const body = await createGenre()

    const newSong = await supertest(app)
      .post("/recommendations")
      .send(body);

    const newSongId = newSong.body.id;

    const response = await supertest(app).post(
      `/recommendations/${newSongId}/downvote`
    );

    expect(response.status).toBe(200);
  });
});

describe("GET /recommendations/random", () => {
  it("return status 404 if no song was found on database.", async () => {
    const response = await supertest(app).get("/recommendations/random");
    expect(response.status).toBe(404);
  });

  it("return status 200 if at least one song was found on database.", async () => {
    const body = await createGenre();

    let highRecommendation = await supertest(app)
      .post("/recommendations")
      .send(body);

    const highSongId = highRecommendation.body.id;

    for (let i = 0; i < 10; i++) {
      await supertest(app).post(`/recommendations/${highSongId}/upvote`);
    }

    const response = await supertest(app).get("/recommendations/random");

    expect(response.status).toBe(200);
  });
});

describe("GET /recommendations/top/:amount", () => {
  it(`return status 200 and
        an empty array if no song was found on database.`, async () => {
    const response = await supertest(app).get("/recommendations/top/10");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it(`return status 200,
        an array with a chosen length
        and with songs order by descending score.`, async () => {
    const body = await createGenre()

    for (let i = 0; i < 10; i++) {
      await supertest(app).post("/recommendations").send(body);
    }

    const firstSongId = 3;

    for (let i = 0; i < 5; i++) {
      await supertest(app).post(`/recommendations/${firstSongId}/upvote`);
    }

    const secondSongId = 2;

    for (let i = 0; i < 3; i++) {
      await supertest(app).post(`/recommendations/${secondSongId}/upvote`);
    }

    const response = await supertest(app).get("/recommendations/top/3");

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await endConnection();
});
