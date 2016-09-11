"use strict";

exports.install = function () {
    F.restful('/drink_rfids/', [], json_drink_rfid_query, json_drink_rfid_get, json_drink_rfid_save, json_drink_rfid_delete);
};

/**
 * Description: Get drink_rfids
 * Method: GET
 * Output: JSON
 */
function json_drink_rfid_query() {

    let self = this,
        Drink_rfid = MODEL('drink_rfid').Schema;

    framework.logger.debug("GET drink_rfids");

    Drink_rfid.findAll({}).then(function(docs){
      self.res.send(200, {success: true, drink_rfids: docs}, 'application/json');
      // TODO: voir si docs est vide si on retourne une 404 ?
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the drink_rfids"}, 'application/json');
    });
}

/**
 * Description: Get drink_rfid
 * Method: GET
 * Output: JSON
 *
 * @param id
 */
function json_drink_rfid_get(id) {

    let self = this,
        Drink_rfid = MODEL('drink_rfid').Schema;

    framework.logger.debug("try to get drink_rfid : ",id);

    Drink_rfid.findById(id).then(function(drink_rfid){
      if(drink_rfid){
          framework.logger.debug("drink_rfid : ",drink_rfid);
          self.res.send(200, {success: true, drink_rfid: drink_rfid}, 'application/json');
      } else {
          framework.logger.error("No drink_rfid found for the id : ",id);
          self.res.send(404, {success: false, message: "No drink_rfid found for the id : "+id}, 'application/json');
      }
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the drink_rfid "+id}, 'application/json');
    });
}

/**
 * Description: Save drink_rfid
 * Method: POST
 * Output: JSON
 *
 * @param id
 */
function json_drink_rfid_save(id) {

    let self = this,
        Drink_rfid = MODEL('drink_rfid').Schema;

    if(!id){
        let drink_rfid = Drink_rfid.build(self.body);
        drink_rfid.save().then(function(drink_rfidSaved){
          if(drink_rfidSaved){
              framework.logger.debug('Added new drink_rfid : ' + drink_rfidSaved);
              self.res.send(201, {
                  success: true,
                  message: 'Added new drink_rfid : ' + drink_rfidSaved,
                  drink_rfid: drink_rfidSaved
              }, 'application/json');
          } else {
              framework.logger.error('No drink_rfid');
              self.res.send(404, {success: false, message: 'No drink_rfid'}, 'application/json');
          }
        }).catch(function(error){
          framework.logger.error(error);
          self.res.send(404, {success: false, message: error}, 'application/json');
        });
    } else {
      let rcvd_drink_rfid = self.body;
      Drink_rfid.findById(id).then(function(drink_rfid){
        if(drink_rfid){
            framework.logger.debug("drink_rfid : ",drink_rfid);
            drink_rfid.update(rcvd_drink_rfid).then(function(updatedDrink_rfid){
              if(updatedDrink_rfid){
                framework.logger.debug('drink_rfid updated : ' + updatedDrink_rfid);
                self.res.send(200, {
                  success: true,
                  message: 'Drink_rfid updated : ' + updatedDrink_rfid,
                  drink_rfid: updatedDrink_rfid
                }, 'application/json');
              } else {
                framework.logger.error('No drink_rfid');
                self.res.send(404, {success: false, message: 'No drink_rfid'}, 'application/json');
              }
            }).catch(function(error){
              framework.logger.error(error);
              self.res.send(404, {success: false, message: error}, 'application/json');
            });
        } else {
            framework.logger.error("No drink_rfid found for the id : ",id);
            self.res.send(404, {success: false, message: "No drink_rfid found for the id : "+id}, 'application/json');
        }
      }).catch(function(error){
        framework.logger.error(error);
        self.res.send(400, {success: false, message: "Error occured while updating the drink_rfid "+id}, 'application/json');
      });
    }
}

/**
 * Description: Delete drink_rfid
 * Method: DELETE
 * Output: JSON
 *
 * @param id
 */
function json_drink_rfid_delete(id) {

    let self = this,
        Drink_rfid = MODEL('drink_rfid').Schema;

    console.log('delete drink_rfid ->', id);

    self.change('drink_rfid: deleted, id: ' + id);

    Drink_rfid.findById(id).then(function(drink_rfid){
      if(drink_rfid){
        drink_rfid.destroy();
      }
    }).catch(function(error){
      framework.logger.error(error);
    });
}
