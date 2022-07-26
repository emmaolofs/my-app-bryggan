import moment from 'moment';

class Order {
  constructor(id, items, totalAmount, date, userId, isReady) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
    this.userId = userId;
    this.isReady = isReady;
  }

  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;
