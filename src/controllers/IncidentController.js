const connection = require('../database/connection');

module.exports = {
  async store(request, response) {
    const { inc_title, inc_description, inc_value } = request.body;

    const inc_idong = request.headers.authorization;

    const [inc_id] = await connection('incidents').insert({
      inc_title, inc_description, inc_value, inc_idong
    });

    return response.json({ inc_id });
  },

  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    response.header('X-Total-Count', count['count(*)']);

    const incidents = await connection('incidents')
      .join('ongs','ongs.ong_id', '=', 'incidents.inc_idong')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.ong_name', 'ongs.ong_email', 'ongs.ong_whatsapp', 'ongs.ong_city', 'ongs.ong_uf']);

    return response.json({incidents});
  },

  async delete(request, response) {
    const { id }     = request.params;
    const inc_idong  = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id',id)
      .select('inc_idong')
      .first();

      if (incident.inc_idong !== inc_idong) {
        return response.status(401).json({error: 'Operation not permited'})
      }

      await connection('incidents').where('id',id).delete();

      return response.status(204).send();
  }
};