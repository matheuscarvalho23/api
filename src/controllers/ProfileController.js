const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const inc_idong = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('inc_idong',inc_idong)
      .select('*');

    return response.json(incidents);
  }
};