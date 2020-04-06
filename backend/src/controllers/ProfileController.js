const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response){
        const { id } = request.body;
        const ong = await connection('ongs')
                            .where('id', id)
                            .select('name')
                            .first();
        if(!ong){
            return response.status(400).json({ error: "No ONG found with this id." });
        }
        return response.json(ong);
    },
    async index(request, response){
        const ong_id = request.headers.authorization;
        const { page = 1} = request.query;
        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
                                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                                .limit(5)
                                .where('ong_id', ong_id)
                                .offset((page-1) * 5)
                                .select(['incidents.*', 
                                        'ongs.name', 
                                        'ongs.email',
                                        'ongs.whatsapp', 
                                        'ongs.city',
                                        'ongs.uf']);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    }
}