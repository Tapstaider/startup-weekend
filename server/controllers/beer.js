"use strict";

exports.install = function () {
  F.route('/mybeer/{id}', my_beer, ['get','cors']);
  F.restful('/beers/', ['cors'], json_beer_query, json_beer_get, json_beer_save, json_beer_delete);
};

function my_beer(id){
  let self = this,
  Beer = MODEL('beer').Schema,
  Drink_rfid = MODEL('drink_rfid').Schema;

  Drink_rfid.findById(id).then(function(drink){
    framework.logger.log('drink ====================> ' + drink);
    Beer.findById(drink.id_beer).then(function(beer){
      self.res.send(200, {success: true, beer: beer}, 'application/json');
    }).catch(function(error){
      ;
    });
  }).catch(function(error){
    ;
  });
}

/**
 * Description: Get beers
 * Method: GET
 * Output: JSON
 */
function json_beer_query() {

    let self = this,
        Beer = MODEL('beer').Schema;

    framework.logger.debug("GET beers");

    Beer.findAll({}).then(function(docs){
      self.res.send(200, {success: true, beers: docs}, 'application/json');
      // TODO: voir si docs est vide si on retourne une 404 ?
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the beers"}, 'application/json');
    });
}

/**
 * Description: Get beer
 * Method: GET
 * Output: JSON
 *
 * @param id
 */
function json_beer_get(id) {

    let self = this,
        Beer = MODEL('beer').Schema;

    framework.logger.debug("try to get beer : ",id);

    Beer.findById(id).then(function(beer){
      if(beer){
          framework.logger.debug("beer : ",beer);
          self.res.send(200, {success: true, beer: beer}, 'application/json');
      } else {
          framework.logger.error("No beer found for the id : ",id);
          self.res.send(404, {success: false, message: "No beer found for the id : "+id}, 'application/json');
      }
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the beer "+id}, 'application/json');
    });
}

/**
 * Description: Save beer
 * Method: POST
 * Output: JSON
 *
 * @param id
 */
function json_beer_save(id) {

    let self = this,
        Beer = MODEL('beer').Schema;

    if(!id){
        let beer = Beer.build(self.body);
        beer.save().then(function(beerSaved){
          if(beerSaved){
              framework.logger.debug('Added new beer : ' + beerSaved);
              self.res.send(201, {
                  success: true,
                  message: 'Added new beer : ' + beerSaved,
                  beer: beerSaved
              }, 'application/json');
          } else {
              framework.logger.error('No beer');
              self.res.send(404, {success: false, message: 'No beer'}, 'application/json');
          }
        }).catch(function(error){
          framework.logger.error(error);
          self.res.send(404, {success: false, message: error}, 'application/json');
        });
    } else {
      let rcvd_beer = self.body;
      Beer.findById(id).then(function(beer){
        if(beer){
            framework.logger.debug("beer : ",beer);
            beer.update(rcvd_beer).then(function(updatedBeer){
              if(updatedBeer){
                framework.logger.debug('beer updated : ' + updatedBeer);
                self.res.send(200, {
                  success: true,
                  message: 'Beer updated : ' + updatedBeer,
                  beer: updatedBeer
                }, 'application/json');
              } else {
                framework.logger.error('No beer');
                self.res.send(404, {success: false, message: 'No beer'}, 'application/json');
              }
            }).catch(function(error){
              framework.logger.error(error);
              self.res.send(404, {success: false, message: error}, 'application/json');
            });
        } else {
            framework.logger.error("No beer found for the id : ",id);
            self.res.send(404, {success: false, message: "No beer found for the id : "+id}, 'application/json');
        }
      }).catch(function(error){
        framework.logger.error(error);
        self.res.send(400, {success: false, message: "Error occured while updating the beer "+id}, 'application/json');
      });
    }
}

/**
 * Description: Delete beer
 * Method: DELETE
 * Output: JSON
 *
 * @param id
 */
function json_beer_delete(id) {

    let self = this,
        Beer = MODEL('beer').Schema;

    console.log('delete beer ->', id);

    self.change('beer: deleted, id: ' + id);

    Beer.findById(id).then(function(beer){
      if(beer){
        beer.destroy();
      }
    }).catch(function(error){
      framework.logger.error(error);
    });
}
