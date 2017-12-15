
var Human = function(shirt, pant, skin) {
    this.angle_to_mouse = 0;
    this.progress = 0;
    this.pos = {x: 25, y: 25, face: 'lf', moving: false};
    this.shirt_color = shirt || "#9a9a9a";
    this.pant_color = pant || "#333";
    this.skin_color = skin || ["#f7c19b", "#876127"][Math.floor(2*Math.random())];
    this.head = {
      color: this.skin_color,
      height: 12,
      width: 8,
      lf: {x: 2, y: -11, width: 8, height: 12},
      lb: {x: 2, y: -11, width: 8, height: 11},
      rf: {x: 4, y: -11, width: 8, height: 12},
      rb: {x: 4, y: -11, width: 8, height: 11},
    };
    this.torso_top = {
      color: this.shirt_color,
      height: 15,
      width: 16,
      lf: {x: -1, y: 0, width: 16, height: 15},
      lb: {x: -1, y: 0, width: 16, height: 15},
      rf: {x: 0, y: 0, width: 16, height: 15},
      rb: {x: 0, y: 0, width: 16, height: 15},
    };
    this.torso_bottom = {
      color: this.shirt_color,
      height: 5,
      width: 15,
      lf: {x: 0, y: 15, width: 15, height: 5},
      lb: {x: 0, y: 15, width: 15, height: 5},
      rf: {x: 0, y: 15, width: 15, height: 5},
      rb: {x: 0, y: 15, width: 15, height: 5},
    };
    this.waist = {
      color: this.pant_color,
      height: 10,
      width: 15,
      lf: {x: 0, y: 20, width: 15, height: 10},
      lb: {x: 0, y: 20, width: 15, height: 10},
      rf: {x: 0, y: 20, width: 15, height: 10},
      rb: {x: 0, y: 20, width: 15, height: 10},
    };
    this.leg_top_left = {
      color: this.pant_color,
      height: 30,
      width: 2,
      lf: {x: -1, y: 25, width: 2, height: 30},
      lb: {x: 0, y: 25, width: 2, height: 30},
      rf: {x: 3, y: 25, width: 2, height: 30},
      rb: {x: 3, y: 25, width: 2, height: 30},
      animate: [{x:0,y:1},{x:0,y:0},{x:0,y:-1},{x:0,y:-2},{x:1,y:-3},{x:1,y:-4},{x:1,y:-5},{x:1,y:-6}],
      current_frame: 0,
      asc: true
    };
    this.leg_bottom_left = {
      color: this.pant_color,
      height: 22,
      width: 2,
      lf: {x: 1, y: 25, width: 2, height: 22},
      lb: {x: 2, y: 25, width: 2, height: 22},
      rf: {x: 1, y: 25, width: 2, height: 22},
      rb: {x: 1, y: 25, width: 2, height: 22},
      animate: [{x:0,y:1},{x:0,y:0},{x:0,y:-1},{x:0,y:-2},{x:1,y:-3},{x:1,y:-4},{x:1,y:-5},{x:1,y:-6}],
      current_frame: 0,
      asc: true
    };
    this.leg_top_right = {
      color: this.pant_color,
      height: 30,
      width: 2,
      lf: {x: 10, y: 25, width: 2, height: 30},
      lb: {x: 10, y: 25, width: 2, height: 30},
      rf: {x: 14, y: 25, width: 2, height: 30},
      rb: {x: 13, y: 25, width: 2, height: 30},
      animate: [{x:1,y:-6},{x:1,y:-5},{x:1,y:-4},{x:0,y:-3},{x:0,y:-2},{x:0,y:-1},{x:0,y:0},{x:0,y:1}],
      current_frame: 0,
      asc: true
    };
    this.leg_bottom_right = {
      color: this.pant_color,
      height: 22,
      width: 2,
      lf: {x: 12, y: 25, width: 2, height: 22},
      lb: {x: 12, y: 25, width: 2, height: 22},
      rf: {x: 12, y: 25, width: 2, height: 22},
      rb: {x: 11, y: 25, width: 2, height: 22},
      animate: [{x:1,y:-6},{x:1,y:-5},{x:1,y:-4},{x:0,y:-3},{x:0,y:-2},{x:0,y:-1},{x:0,y:0},{x:0,y:1}],
      current_frame: 0,
      asc: true
    };
    this.arm_left = {
      color: this.skin_color,
      height: 20,
      width: 3,
      lf: {x: -3, y: 3, width: 2, height: 20},
      lb: {x: -4, y: 3, width: 3, height: 20},
      rf: {x: -1, y: 3, width: 3, height: 20},
      rb: {x: -2, y: 3, width: 2, height: 20},
    };
    this.arm_right = {
      color: this.skin_color,
      height: 20,
      width: 3,
      lf: {x: 13, y: 3, width: 3, height: 20},
      lb: {x: 15, y: 3, width: 2, height: 20},
      rf: {x: 16, y: 3, width: 2, height: 20},
      rb: {x: 16, y: 3, width: 3, height: 20},
    };
    
    this.facing_forward = function() {
      return this.pos.face === 'lf' || this.pos.face === 'rf';
    }
    
    this.drawLimb = function(ctx, part) {
      var hu = this;
      ctx.fillStyle = part.color;

      var x = part[this.pos.face].x;
      var y = part[this.pos.face].y;

      if(part['animate']) {
        if(this.pos.moving) {
          if(this.progress > MAX_PROGRESS) {
            part.current_frame = part.current_frame + (part.asc ? 1 : -1);
            if(part.current_frame == part.animate.length) {
              part.current_frame -= 1; 
              part.asc = false;
            }
            if(part.current_frame < 0) {
              part.current_frame += 1; 
              part.asc = true;
            }
          }
          var cur = part.animate[part.current_frame];
          x += cur.x;
          y += cur.y;
        }
      }

      ctx.fillRect(this.pos.x + x, 
                   this.pos.y + y, 
                   part[this.pos.face].width,
                   part[this.pos.face].height);
    };    
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
    
    this.drawArms = function(cntxt) {
      if (!this.gun.gun) {
        this.drawLimb(cntxt, this.arm_right);
        this.drawLimb(cntxt, this.arm_left);
      }
    };

    this.new_shot = function() {
      // Set the target position
      var targetX = mousePosition.x;
      var targetY = mousePosition.y;

      // Get the direction in x and y (delta)
      var directionX = targetX - this.pos.x;
      var directionY = targetY - this.pos.y;

      // Normalize the direction
      var len = Math.sqrt(directionX * directionX + directionY * directionY);
      directionX = directionX / len;
      directionY = directionY / len;
      var bullet = this.gun.gun.bullet;

      this.gun.shots.push({
        x: this.pos.x,
        y: this.pos.y,
        mx: targetX,
        my: targetY,
        ox: this.pos.x,
        oy: this.pos.y,
        dx: directionX,
        dy: directionY,
        bullet: bullet,
        angle: this.angle_to_mouse
      });
    }

    this.draw_gun = function(ctx){
      var gun = this.gun.gun;
      var x = this.pos.x + (this.torso_top.width/2);
      var y = this.pos.y
    
      var direction = "left";

      var right_angle = this.angle_to_mouse;
      if(mousePosition.x > x) {
        direction = "right";
        right_angle += 180;
      }
      var gun_rects = gun.rects[direction];
      var arm_rects = gun.arms[direction];

      ctx.fillStyle = gun.color;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(right_angle * Math.PI / 180);
      
      // draw gun
      for(var i = 0; i < gun_rects.length; i++) {
        var rect = gun_rects[i];
        ctx.fillRect(rect.x - gun.width, rect.y + gun.height, rect.w, rect.h);
      }

      // draw arms
      ctx.fillStyle = this.skin_color;
      for(var i = 0; i < arm_rects.length; i++) {
        var rect = arm_rects[i];
        ctx.fillRect(rect.x - gun.width, rect.y + gun.height, rect.w, rect.h);
      }
      ctx.restore();
    };

    this.update_shots = function(progress) {
      if(this.gun.gun && mouseDown){
        if(this.gun.delay <= 0) {
          this.reset_gun_delay();
          // add shot
          this.new_shot();
        }
        mouseDown = false;
      }
      for (var i = this.gun.shots.length - 1; i >= 0; i--) {
        this.gun.shots[i].x += (this.gun.shots[i].dx * this.gun.shots[i].bullet.speed);
        this.gun.shots[i].y += (this.gun.shots[i].dy * this.gun.shots[i].bullet.speed);

        if((this.gun.shots[i].x > canvas.width || this.gun.shots[i].x < 0) ||
           (this.gun.shots[i].y > canvas.height || this.gun.shots[i].y < 0)) {
          this.gun.shots.splice(i, 1);
        }
      }

      if(this.gun.delay > 0)
        this.gun.delay -= progress;
    }

    this.draw_shots = function(ctx) {
      ctx.fillStyle = "#FFF";
      // ctx.strokeStyle = "#F00";
      for (var i = this.gun.shots.length - 1; i >= 0; i--) {
        var shot = this.gun.shots[i];
        var targetX = shot.mx;
        var targetY = shot.my;

        var direction = (targetX > shot.x ? "r" : "l")

        var x = shot.x + (this.torso_top.width/2);

        // ctx.strokeRect( x,
        //                 shot.y,
        //                 shot.bullet.width, 
        //                 shot.bullet.height);

        // ctx.save();
        // ctx.translate(x, shot.y);
        // ctx.rotate(shot.angle * Math.PI / 180);
        ctx.fillRect(x, 
                     shot.y, 
                     shot.bullet.width, 
                     shot.bullet.height);
        // ctx.restore();
      }
    }

    this.get_shot_bounds = function(shot) {
      var targetX = shot.mx;
      var targetY = shot.my;

      var direction = (targetX > shot.x ? "r" : "l");
      var x = shot.x + (this.torso_top.width/2);

      return {
        x: x,
        y: shot.y,
        height: shot.bullet.height,
        width: shot.bullet.width
      };
    }

    this._draw = function(cntxt) {
      // shadow
      cntxt.fillStyle = "rgba(0,0,0,.1)";
      cntxt.fillRect(this.pos.x - 3, this.pos.y + 50, 20, 10);

      this.draw_shots(cntxt);
      
      if(!this.facing_forward())
        this.drawArms(cntxt);
      // waist and legs
      this.drawLimb(cntxt, this.waist);
      this.drawLimb(cntxt, this.leg_top_left);
      this.drawLimb(cntxt, this.leg_bottom_left);
      this.drawLimb(cntxt, this.leg_top_right);
      this.drawLimb(cntxt, this.leg_bottom_right);
      // torso
      this.drawLimb(cntxt, this.torso_top);
      this.drawLimb(cntxt, this.torso_bottom);
      // head
      this.drawLimb(cntxt, this.head);    
      // arms
      if(this.facing_forward())
        this.drawArms(cntxt);

      // ctx.strokeStyle = "#F00";
      // ctx.strokeRect(this.pos.x,
      //                this.pos.y,
      //                this.torso_top.width, 
      //                this.torso_top.height+this.torso_bottom.height+this.waist.height);
      if(this.progress > MAX_PROGRESS) this.progress = 0;
    };

    this._update = function(progress) {
      this.progress += progress;

      this.update_shots(progress);

      var x = this.pos.x + (this.torso_top.width/2);
      var y = this.pos.y
      
      this.angle_to_mouse = Math.atan2(y - mousePosition.y, x - mousePosition.x) * 180 / Math.PI;
    };
};
