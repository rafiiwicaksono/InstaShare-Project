'use strict';
const fs = require(`fs`)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))
              .map((isi) => {
                isi.createdAt = new Date()
                isi.updatedAt = new Date()
                return isi
              })
   await queryInterface.bulkInsert(`Users`, data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(`Users`, null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
