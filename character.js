

var MAX_PROGRESS = 16;
function human() {
    this.progress = 0;
  	this.gun = undefined;
    this.pos = {x: 25, y: 25, face: 'lf', angle: 0, moving: false};
    this.head = {
      color: "#f7c19b",
      height: 12,
      width: 8,
      lf: {x: 2, y: -11, width: 8, height: 12},
      lb: {x: 2, y: -11, width: 8, height: 11},
      rf: {x: 4, y: -11, width: 8, height: 12},
      rb: {x: 4, y: -11, width: 8, height: 11},
    };
    this.torso_top = {
      color: "#9a9a9a",
      height: 15,
      width: 16,
      lf: {x: -1, y: 0, width: 16, height: 15},
      lb: {x: -1, y: 0, width: 16, height: 15},
      rf: {x: 0, y: 0, width: 16, height: 15},
      rb: {x: 0, y: 0, width: 16, height: 15},
    };
    this.torso_bottom = {
      color: "#9a9a9a",
      height: 5,
      width: 15,
      lf: {x: 0, y: 15, width: 15, height: 5},
      lb: {x: 0, y: 15, width: 15, height: 5},
      rf: {x: 0, y: 15, width: 15, height: 5},
      rb: {x: 0, y: 15, width: 15, height: 5},
    };
    this.waist = {
      color: "#333",
      height: 10,
      width: 15,
      lf: {x: 0, y: 20, width: 15, height: 10},
      lb: {x: 0, y: 20, width: 15, height: 10},
      rf: {x: 0, y: 20, width: 15, height: 10},
      rb: {x: 0, y: 20, width: 15, height: 10},
    };
    this.leg_top_left = {
      color: "#333",
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
      color: "#333",
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
      color: "#333",
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
      color: "#333",
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
      color: "#f7c19b",
      height: 20,
      width: 3,
      lf: {x: -3, y: 3, width: 2, height: 20},
      lb: {x: -4, y: 3, width: 3, height: 20},
      rf: {x: -1, y: 3, width: 3, height: 20},
      rb: {x: -2, y: 3, width: 2, height: 20},
    };
    this.arm_right = {
      color: "#f7c19b",
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
    
    this.draw_gun = function(ctx){
    	var gun = this.gun;
      var x = this.pos.x + (this.torso_top.width/2);
      var y = this.pos.y
    
      
      var right_angle = Math.atan2(y - mousePosition.y, x - mousePosition.x) * 180 / Math.PI;
      var direction = "left";

      this.pos.angle = right_angle;
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
      ctx.fillStyle = "#f7c19b";
      for(var i = 0; i < arm_rects.length; i++) {
      	var rect = arm_rects[i];
      	ctx.fillRect(rect.x - gun.width, rect.y + gun.height, rect.w, rect.h);
      }
      ctx.restore();
    };
    
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
    
    this.drawArms = function(cntxt) {
    	if (!this.gun) {
        this.drawLimb(cntxt, this.arm_right);
        this.drawLimb(cntxt, this.arm_left);
      }
      else {
         this.draw_gun(cntxt);
      }
    };
    
    this.draw = function(cntxt) {
    	// shadow
      cntxt.fillStyle = "rgba(0,0,0,.1)";
      cntxt.fillRect(this.pos.x - 3, this.pos.y + 50, 20, 10);
      
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

      if(this.progress > MAX_PROGRESS) this.progress = 0;
    };

    this.update = function(progress) {
      checkKeys();
      this.progress += progress;
    };
}