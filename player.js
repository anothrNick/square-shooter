

var MAX_PROGRESS = 16;
var Player = function() {
    Human.apply(this,arguments);

    this.id = "some-unique-id";
    this.display_name = "P1";
    this.gun = {
      gun: undefined,
      clip: 0,
      reload: 0,
      delay: 0,
      shots: []
    };

    this.set_gun = function(gun) {
      if(gun) {
        this.gun.gun = gun;
        this.gun.clip = gun.clip;
        this.gun.reload = (gun.reload * 1000); // to seconds
        // this.reset_gun_delay();
      }
    }

    this.reset_gun_delay = function() {
      this.gun.delay = (this.gun.gun.delay * 1000); // to seconds
    }

    this.draw = function(cntxt) {
      if(!this.facing_forward() && this.gun.gun)
        this.draw_gun(cntxt);

      this._draw(cntxt);

      if(this.facing_forward() && this.gun.gun)
        this.draw_gun(cntxt);
    };

    this.update = function(progress) {
      checkKeys();

      this._update(progress);
    };
};

Player.prototype = Human.prototype;
Player.prototype.constructor = Player;
