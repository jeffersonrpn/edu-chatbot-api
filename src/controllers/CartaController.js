const { Op, Sequelize } = require('sequelize');
const Resposta = require('../models/Resposta');
const Escola = require('../models/Escola');
const Email = require('../models/Email');

const {
  getTextosProblemasSeguranca,
  getTextosProblemasInfraestrutura,
  getTextosRecomendacoes,
  getDivergencias } = require('../scripts/geradorCartas');

module.exports = {
  async find(req, res) {
    const respostas = await Resposta.findAll({
      where: {
        [Op.and]: [
          { confirma_veracidade: "Sim" },
          {
            [Op.or]: [
              { professores_usando_mascara: "Às vezes" },
              { professores_usando_mascara: "Nunca" },
              { alunos_usando_mascara: "Às vezes" },
              { alunos_usando_mascara: "Nunca" },
              { distanciamento_sala: "Sim" },
              { distanciamento_merenda: "Não" },
              { espaco_alternativo_merenda: "Sim" },
              { ventilacao: "Apenas portas ou apenas janelas" },
              { ventilacao: "Não" },
              { patio_descoberto: "Não" },
              { agua_lavar_maos: "Não" },
              { area_verde: "Não" },
            ]
          }
        ]
      },
      include: [
        {
          model: Escola,
          as: 'escola',
          include: [
            {
              model: Email,
              as: 'email'
            }
          ]
        }
      ],
      order: [
        ['created_at', 'DESC']
      ]
    });

    const cartas = respostas.map(resposta => {
      return {
        carta: getDivergencias(resposta, resposta.escola),
        resposta
      }
    });

    return res.json(cartas);
  }
}