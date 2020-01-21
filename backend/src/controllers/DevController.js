const axios = require('axios'); // o Axios serve para fazer chamadas a outras apis nesse caso GitHub
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');


//Geralmente o controlloer tem 5 funções:
//Index (mostrar uma lista), show (mostrar um único), store, update, destroy

module.exports = {

    async index(request, response) {
        const devs = await Dev.find()
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //Filtrar as conexões que estão no máximo 20 km de distância
            //e que o novo Dev tenha ao menos uma das tecnologias filtradas.

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);


        }
        return response.json(dev);
    },

    //async update() {

    //}

    //async destroy(){}
};