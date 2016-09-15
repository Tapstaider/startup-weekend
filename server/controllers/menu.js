"use strict";

exports.install = function () {
    F.restful('/menus/', ['cors'], json_menu_query, json_menu_get, json_menu_save, json_menu_delete);
};

/**
 * Description: Get menus
 * Method: GET
 * Output: JSON
 */
function json_menu_query() {

    let self = this,
        Menu = MODEL('menu').Schema;

    framework.logger.debug("GET menus");

    Menu.findAll({}).then(function(docs){
      self.res.send(200, {success: true, menus: docs}, 'application/json');
      // TODO: voir si docs est vide si on retourne une 404 ?
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the menus"}, 'application/json');
    });
}

/**
 * Description: Get menu
 * Method: GET
 * Output: JSON
 *
 * @param id
 */
function json_menu_get(id) {

    let self = this,
        Menu = MODEL('menu').Schema;

    framework.logger.debug("try to get menu : ",id);

    Menu.findById(id).then(function(menu){
      if(menu){
          framework.logger.debug("menu : ",menu);
          self.res.send(200, {success: true, menu: menu}, 'application/json');
      } else {
          framework.logger.error("No menu found for the id : ",id);
          self.res.send(404, {success: false, message: "No menu found for the id : "+id}, 'application/json');
      }
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the menu "+id}, 'application/json');
    });
}

/**
 * Description: Save menu
 * Method: POST
 * Output: JSON
 *
 * @param id
 */
function json_menu_save(id) {

    let self = this,
        Menu = MODEL('menu').Schema;

    if(!id){
        let menu = Menu.build(self.body);
        menu.save().then(function(menuSaved){
          if(menuSaved){
              framework.logger.debug('Added new menu : ' + menuSaved);
              self.res.send(201, {
                  success: true,
                  message: 'Added new menu : ' + menuSaved,
                  menu: menuSaved
              }, 'application/json');
          } else {
              framework.logger.error('No menu');
              self.res.send(404, {success: false, message: 'No menu'}, 'application/json');
          }
        }).catch(function(error){
          framework.logger.error(error);
          self.res.send(404, {success: false, message: error}, 'application/json');
        });
    } else {
      let rcvd_menu = self.body;
      Menu.findById(id).then(function(menu){
        if(menu){
            framework.logger.debug("menu : ",menu);
            menu.update(rcvd_menu).then(function(updatedMenu){
              if(updatedMenu){
                framework.logger.debug('menu updated : ' + updatedMenu);
                self.res.send(200, {
                  success: true,
                  message: 'Menu updated : ' + updatedMenu,
                  menu: updatedMenu
                }, 'application/json');
              } else {
                framework.logger.error('No menu');
                self.res.send(404, {success: false, message: 'No menu'}, 'application/json');
              }
            }).catch(function(error){
              framework.logger.error(error);
              self.res.send(404, {success: false, message: error}, 'application/json');
            });
        } else {
            framework.logger.error("No menu found for the id : ",id);
            self.res.send(404, {success: false, message: "No menu found for the id : "+id}, 'application/json');
        }
      }).catch(function(error){
        framework.logger.error(error);
        self.res.send(400, {success: false, message: "Error occured while updating the menu "+id}, 'application/json');
      });
    }
}

/**
 * Description: Delete menu
 * Method: DELETE
 * Output: JSON
 *
 * @param id
 */
function json_menu_delete(id) {

    let self = this,
        Menu = MODEL('menu').Schema;

    console.log('delete menu ->', id);

    self.change('menu: deleted, id: ' + id);

    Menu.findById(id).then(function(menu){
      if(menu){
        menu.destroy();
      }
    }).catch(function(error){
      framework.logger.error(error);
    });
}
