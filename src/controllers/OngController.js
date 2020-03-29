const connection = require('../database/connection');
const crypto     = require('crypto');

module.exports = {
  async store(request, response) {
    const { ong_name, ong_email, ong_whatsapp, ong_city, ong_uf } = request.body;

    const ong_id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      ong_id,
      ong_name,
      ong_email,
      ong_whatsapp,
      ong_city,
      ong_uf,
    });

    return response.json({ong_id})
  },

  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json({ongs})
  }
}