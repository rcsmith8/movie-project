module.exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reviews RESTART IDENTITY CASCADE")
    .then(() => knex.raw("TRUNCATE TABLE movies_theaters RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE TABLE critics RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE TABLE movies RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE TABLE theaters RESTART IDENTITY CASCADE"));
};
