const { Model, DataTypes } = require('sequelize');

class Resposta extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: DataTypes.STRING,
      aluno_rede_publica: DataTypes.STRING,
      aulas: DataTypes.STRING,
      formato_aulas: DataTypes.STRING,
      professores_usando_mascara: DataTypes.STRING,
      alunos_usando_mascara: DataTypes.STRING,
      quantidade_alunos_aula_presencial: DataTypes.INTEGER,
      distanciamento_sala: DataTypes.STRING,
      distanciamento_merenda: DataTypes.STRING,
      espaco_alternativo_merenda: DataTypes.STRING,
      patio_descoberto: DataTypes.STRING,
      agua_lavar_maos: DataTypes.STRING,
      agua_beber: DataTypes.STRING,
      area_verde: DataTypes.STRING,
      confirma_veracidade: DataTypes.STRING,
      complemento: DataTypes.TEXT,
    }, {
      sequelize: connection,
      timestamps: true,
      modelName: 'respostas'
    })
  }
}

module.exports = Resposta;