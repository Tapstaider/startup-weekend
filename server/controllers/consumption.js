"use strict";

exports.install = function () {
    F.restful('/consumptions/', [], json_consumption_query, json_consumption_get, json_consumption_save, json_consumption_delete);
};

/**
 * Description: Get consumptions
 * Method: GET
 * Output: JSON
 */
function json_consumption_query() {

    let self = this,
        Consumption = MODEL('consumption').Schema;

    framework.logger.debug("GET consumptions");

    Consumption.findAll({}).then(function(docs){
      self.res.send(200, {success: true, consumptions: docs}, 'application/json');
      // TODO: voir si docs est vide si on retourne une 404 ?
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the consumptions"}, 'application/json');
    });
}

/**
 * Description: Get consumption
 * Method: GET
 * Output: JSON
 *
 * @param id
 */
function json_consumption_get(id) {

    let self = this,
        Consumption = MODEL('consumption').Schema;

    framework.logger.debug("try to get consumption : ",id);

    Consumption.findById(id).then(function(consumption){
      if(consumption){
          framework.logger.debug("consumption : ",consumption);
          self.res.send(200, {success: true, consumption: consumption}, 'application/json');
      } else {
          framework.logger.error("No consumption found for the id : ",id);
          self.res.send(404, {success: false, message: "No consumption found for the id : "+id}, 'application/json');
      }
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the consumption "+id}, 'application/json');
    });
}

/**
 * Description: Save consumption
 * Method: POST
 * Output: JSON
 *
 * @param id
 */
function json_consumption_save(id) {

    let self = this,
        Consumption = MODEL('consumption').Schema;

    if(!id){
        let consumption = Consumption.build(self.body);
        consumption.save().then(function(consumptionSaved){
          if(consumptionSaved){
              framework.logger.debug('Added new consumption : ' + consumptionSaved);
              self.res.send(201, {
                  success: true,
                  message: 'Added new consumption : ' + consumptionSaved,
                  consumption: consumptionSaved
              }, 'application/json');
          } else {
              framework.logger.error('No consumption');
              self.res.send(404, {success: false, message: 'No consumption'}, 'application/json');
          }
        }).catch(function(error){
          framework.logger.error(error);
          self.res.send(404, {success: false, message: error}, 'application/json');
        });
    } else {
      let rcvd_consumption = self.body;
      Consumption.findById(id).then(function(consumption){
        if(consumption){
            framework.logger.debug("consumption : ",consumption);
            consumption.update(rcvd_consumption).then(function(updatedConsumption){
              if(updatedConsumption){
                framework.logger.debug('consumption updated : ' + updatedConsumption);
                self.res.send(200, {
                  success: true,
                  message: 'Consumption updated : ' + updatedConsumption,
                  consumption: updatedConsumption
                }, 'application/json');
              } else {
                framework.logger.error('No consumption');
                self.res.send(404, {success: false, message: 'No consumption'}, 'application/json');
              }
            }).catch(function(error){
              framework.logger.error(error);
              self.res.send(404, {success: false, message: error}, 'application/json');
            });
        } else {
            framework.logger.error("No consumption found for the id : ",id);
            self.res.send(404, {success: false, message: "No consumption found for the id : "+id}, 'application/json');
        }
      }).catch(function(error){
        framework.logger.error(error);
        self.res.send(400, {success: false, message: "Error occured while updating the consumption "+id}, 'application/json');
      });
    }
}

/**
 * Description: Delete consumption
 * Method: DELETE
 * Output: JSON
 *
 * @param id
 */
function json_consumption_delete(id) {

    let self = this,
        Consumption = MODEL('consumption').Schema;

    console.log('delete consumption ->', id);

    self.change('consumption: deleted, id: ' + id);

    Consumption.findById(id).then(function(consumption){
      if(consumption){
        consumption.destroy();
      }
    }).catch(function(error){
      framework.logger.error(error);
    });
}
