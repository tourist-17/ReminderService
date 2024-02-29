const { Notification } = require("../models/index");
const { Op } = require("sequelize");
class TicketRepository {
  async getAll() {
    try {
      const ticket = await Notification.findAll();
      return ticket;
    } catch (error) {
      throw error;
    }
  }
  async create(data) {
    try {
      const ticket = await Notification.create(data);
      return ticket;
    } catch (error) {
      throw error;
    }
  }
  async get(filter) {
    try {
      const ticket = await Notification.findAll({
        where: {
        //   status: filter.status,
          NotificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return ticket;
    } catch (error) {
      throw error;
    }
  }
  async update(ticketId, data) {
    try {
      const ticket = await Notification.findByPk(ticketId);
      if (data.status) ticket.status = data.status;
      await ticket.save();
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketRepository;
