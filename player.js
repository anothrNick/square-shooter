

var MAX_PROGRESS = 16;
var Player = function() {
    Human.apply(this,arguments);

    this.id = "some-unique-id";
    this.display_name = "P1";

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
