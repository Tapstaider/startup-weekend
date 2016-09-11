"use strict";

exports.install = function () {
    F.restful('/bars/', [], json_bar_query, json_bar_get, json_bar_save, json_bar_delete);
};

/**
 * Description: Get bars
 * Method: GET
 * Output: JSON
 */
function json_bar_query() {

    let self = this,
        Bar = MODEL('bar').Schema;

    framework.logger.debug("GET bars");

    Bar.findAll({}).then(function(docs){
      self.res.send(200, {success: true, bars: docs}, 'application/json');
      // TODO: voir si docs est vide si on retourne une 404 ?
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the bars"}, 'application/json');
    });
}

/**
 * Description: Get bar
 * Method: GET
 * Output: JSON
 *
 * @param id
 */
function json_bar_get(id) {

    let self = this,
        Bar = MODEL('bar').Schema;

    framework.logger.debug("try to get bar : ",id);

    Bar.findById(id).then(function(bar){
      if(bar){
          framework.logger.debug("bar : ",bar);
          self.res.send(200, {success: true, bar: bar}, 'application/json');
      } else {
          framework.logger.error("No bar found for the id : ",id);
          self.res.send(404, {success: false, message: "No bar found for the id : "+id}, 'application/json');
      }
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the bar "+id}, 'application/json');
    });
}

/**
 * Description: Save bar
 * Method: POST
 * Output: JSON
 *
 * @param id
 */
function json_bar_save(id) {

    let self = this,
        Bar = MODEL('bar').Schema;

    if(!id){
        let bar = Bar.build(self.body);
        bar.save().then(function(barSaved){
          if(barSaved){
              framework.logger.debug('Added new bar : ' + barSaved);
              self.res.send(201, {
                  success: true,
                  message: 'Added new bar : ' + barSaved,
                  bar: barSaved
              }, 'application/json');
          } else {
              framework.logger.error('No bar');
              self.res.send(404, {success: false, message: 'No bar'}, 'application/json');
          }
        }).catch(function(error){
          framework.logger.error(error);
          self.res.send(404, {success: false, message: error}, 'application/json');
        });
    } else {
      let rcvd_bar = self.body;
      Bar.findById(id).then(function(bar){
        if(bar){
            framework.logger.debug("bar : ",bar);
            bar.update(rcvd_bar).then(function(updatedBar){
              if(updatedBar){
                framework.logger.debug('bar updated : ' + updatedBar);
                self.res.send(200, {
                  success: true,
                  message: 'Bar updated : ' + updatedBar,
                  bar: updatedBar
                }, 'application/json');
              } else {
                framework.logger.error('No bar');
                self.res.send(404, {success: false, message: 'No bar'}, 'application/json');
              }
            }).catch(function(error){
              framework.logger.error(error);
              self.res.send(404, {success: false, message: error}, 'application/json');
            });
        } else {
            framework.logger.error("No bar found for the id : ",id);
            self.res.send(404, {success: false, message: "No bar found for the id : "+id}, 'application/json');
        }
      }).catch(function(error){
        framework.logger.error(error);
        self.res.send(400, {success: false, message: "Error occured while updating the bar "+id}, 'application/json');
      });
    }
}

/**
 * Description: Delete bar
 * Method: DELETE
 * Output: JSON
 *
 * @param id
 */
function json_bar_delete(id) {

    let self = this,
        Bar = MODEL('bar').Schema;

    console.log('delete bar ->', id);

    self.change('bar: deleted, id: ' + id);

    Bar.findById(id).then(function(bar){
      if(bar){
        bar.destroy();
      }
    }).catch(function(error){
      framework.logger.error(error);
    });
}
