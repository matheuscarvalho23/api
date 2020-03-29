const connection = require('../database/connection');

module.exports = {
  async store(request, response) {
    const { ong_id } = request.body;

    const ong = await connection('ongs')
      .where('ong_id',ong_id)
      .select('ong_name')
      .first();

      if (!ong) {
        return response.status(400).json({ error: 'No ONG found with this ID' });
      }

      return response.json(ong);
  }
}