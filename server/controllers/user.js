"use strict";

exports.install = function () {
    F.restful('/users/', [], json_user_query, json_user_get, json_user_save, json_user_delete);
};

/**
 * Description: Get users
 * Method: GET
 * Output: JSON
 */
function json_user_query() {

    let self = this,
        User = MODEL('user').Schema;

    framework.logger.debug("GET users");

    User.findAll({}).then(function(docs){
      self.res.send(200, {success: true, users: docs}, 'application/json');
      // TODO: voir si docs est vide si on retourne une 404 ?
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the users"}, 'application/json');
    });
}

/**
 * Description: Get user
 * Method: GET
 * Output: JSON
 *
 * @param id
 */
function json_user_get(id) {

    let self = this,
        User = MODEL('user').Schema;

    framework.logger.debug("try to get user : ",id);

    User.findById(id).then(function(user){
      if(user){
          framework.logger.debug("user : ",user);
          self.res.send(200, {success: true, user: user}, 'application/json');
      } else {
          framework.logger.error("No user found for the id : ",id);
          self.res.send(404, {success: false, message: "No user found for the id : "+id}, 'application/json');
      }
    }).catch(function(error){
      framework.logger.error(error);
      self.res.send(400, {success: false, message: "Error occured while getting the user "+id}, 'application/json');
    });
}

/**
 * Description: Save user
 * Method: POST
 * Output: JSON
 *
 * @param id
 */
function json_user_save(id) {

    let self = this,
        User = MODEL('user').Schema;

    if(!id){
        let user = User.build(self.body);
        user.save().then(function(userSaved){
          if(userSaved){
              framework.logger.debug('Added new user : ' + userSaved);
              self.res.send(201, {
                  success: true,
                  message: 'Added new user : ' + userSaved,
                  user: userSaved
              }, 'application/json');
          } else {
              framework.logger.error('No user');
              self.res.send(404, {success: false, message: 'No user'}, 'application/json');
          }
        }).catch(function(error){
          framework.logger.error(error);
          self.res.send(404, {success: false, message: error}, 'application/json');
        });
    } else {
      let rcvd_user = self.body;
      User.findById(id).then(function(user){
        if(user){
            framework.logger.debug("user : ",user);
            user.update(rcvd_user).then(function(updatedUser){
              if(updatedUser){
                framework.logger.debug('user updated : ' + updatedUser);
                self.res.send(200, {
                  success: true,
                  message: 'User updated : ' + updatedUser,
                  user: updatedUser
                }, 'application/json');
              } else {
                framework.logger.error('No user');
                self.res.send(404, {success: false, message: 'No user'}, 'application/json');
              }
            }).catch(function(error){
              framework.logger.error(error);
              self.res.send(404, {success: false, message: error}, 'application/json');
            });
        } else {
            framework.logger.error("No user found for the id : ",id);
            self.res.send(404, {success: false, message: "No user found for the id : "+id}, 'application/json');
        }
      }).catch(function(error){
        framework.logger.error(error);
        self.res.send(400, {success: false, message: "Error occured while updating the user "+id}, 'application/json');
      });
    }
}

/**
 * Description: Delete user
 * Method: DELETE
 * Output: JSON
 *
 * @param id
 */
function json_user_delete(id) {

    let self = this,
        User = MODEL('user').Schema;

    console.log('delete user ->', id);

    self.change('user: deleted, id: ' + id);

    User.findById(id).then(function(user){
      if(user){
        user.destroy();
      }
    }).catch(function(error){
      framework.logger.error(error);
    });
}
