const queries = {
  create: `db.city.insert({id:211,Kabul:'Nuenen',code:'NLD'})`,
  update: `db.city.update({id:211},{$set:{population:'22437'}})`,
  read: {
    firstMethod: `db.city.find({id:211})`,
    secondMethod: `db.city.find({code:'NLD'})`,
  },
  delete: `db.city.remove({id:211})`,
};
