

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

      this.target.x = mousePosition.x;
      this.target.y = mousePosition.y;

      this._update(progress);
    };
};

Player.prototype = Human.prototype;
Player.prototype.constructor = Player;

var Enemy = function() {
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
      this._update(progress);
    };
};

Enemy.prototype = Human.prototype;
Enemy.prototype.constructor = Enemy;
