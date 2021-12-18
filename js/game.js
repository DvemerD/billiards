function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Pyramid(diametr, left, top, orientation) {
    var apyramid = [];
    var xc = left + (diametr * 5 / 2);
    var yc = top;
    if (orientation == 1) { yc = top + (diametr * 5 / 2); }
    for (var i = 1; i <= 5; i++) {
        var x = xc - (i - 1) * (diametr / 2);
        for (var j = 1; j <= i; j++) {
            apyramid.push({ x: x, y: yc });
            x += diametr;
        }
        //xc -= diametr / 2;      
        if (orientation == 1) yc -= diametr - 2;
        else yc += (diametr) - 1;
    }
    return apyramid;
}


var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function BootScene() {
            Phaser.Scene.call(this, { key: 'BootScene' });
        },

    preload: function () {
        // ����� ����� �������� ��������
        this.load.atlas('balls', 'assets/balls/balls.png', 'assets/balls/balls_atlas.json');
        this.load.image('bKick', 'assets/bKick.png');
        this.load.image('border1', 'assets/border1.png');
        this.load.image('border2', 'assets/border2.png');
    },

    create: function () {
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function WorldScene() {
            Phaser.Scene.call(this, { key: 'WorldScene' });

        },

    preload: function () {

    },

    create: function () {
        this.bordertop = new Phaser.Physics.Matter.Sprite(this.matter.world, 195, 15, 'border1', 0);
        this.bordertop.body.restitution = 0.85;
        this.add.existing(this.bordertop);
        this.bordertop.body.isStatic = true;

        this.borderleft1 = new Phaser.Physics.Matter.Sprite(this.matter.world, 25, 195, 'border2', 0);
        this.borderleft1.body.restitution = 0.85;
        this.add.existing(this.borderleft1);
        this.borderleft1.body.isStatic = true;

        this.borderleft2 = new Phaser.Physics.Matter.Sprite(this.matter.world, 25, 505, 'border2', 0);
        this.borderleft2.body.restitution = 0.85;
        this.add.existing(this.borderleft2);
        this.borderleft2.body.isStatic = true;

        this.borderright1 = new Phaser.Physics.Matter.Sprite(this.matter.world, 365, 195, 'border2', 0);
        this.borderright1.body.restitution = 0.85;
        this.add.existing(this.borderright1);
        this.borderright1.body.isStatic = true;

        this.borderright2 = new Phaser.Physics.Matter.Sprite(this.matter.world, 365, 505, 'border2', 0);
        this.borderright2.body.restitution = 0.85;
        this.add.existing(this.borderright2);
        this.borderright2.body.isStatic = true;

        this.borderbottom = new Phaser.Physics.Matter.Sprite(this.matter.world, 195, 685, 'border1', 0);
        this.borderbottom.body.restitution = 0.85;
        this.add.existing(this.borderbottom);
        this.borderbottom.body.isStatic = true;

        this.pyramid = Pyramid(34, 110, 150, 1);
        this.balls = this.buildPyramid(this.pyramid);
        //this.balls = this.buildSprites( this.pyramid );

        this.ball1 = new Phaser.Physics.Matter.Sprite(this.matter.world, 195, 600, 'balls', 'ball_yellow');
        //this.Physics.setMass(this.ball1.body, 10);
        //Phaser.Physics.Matter.Matter.setMass(this.ball1.body, 12);
        console.log(this.pyramid);
        this.ball1.body.mass = 34;
        //this.ball1.body.inertia = 10000;
        this.ball1.body.bounce = 1;
        this.ball1.setCircle();
        this.ball1.setFriction(0.005);
        this.ball1.body.restitution = 1;
        this.add.existing(this.ball1);  // ���������� ���������� ������ �� ������

        this.bKick = this.add.sprite(80, 720, 'bKick');
        this.bKick.setInteractive();
        this.bKick.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            console.log('kick');
            console.log(this.ball1.body);
            //this.ball1.velocity = {x: 10, y: 0};
            this.ball1.setVelocity(0, -20);
        });

        this.matter.world.setBounds(0, 0, 390, 800, 50, true, true, true, true);
        this.matter.add.mouseSpring();
    },

    buildSprites(pyramid) {
        var balls = [];
        for (var i = 0; i < pyramid.length; i++) {
            balls.push(this.add.sprite(pyramid[i].x, pyramid[i].y, 'balls', 'ball_gray'));
        }
        return balls;
    },

    buildPyramid(pyramid) {
        var balls = [];
        for (var i = 0; i < pyramid.length; i++) {
            balls.push(new Phaser.Physics.Matter.Sprite(this.matter.world, pyramid[i].x, pyramid[i].y, 'balls', 'ball_gray'));
            balls[i].body.mass = 34;
            balls[i].body.bounce = 1;
            //balls[i].body.inertia = 10000;
            balls[i].setCircle();
            balls[i].setFriction(0.005);
            balls[i].body.restitution = 1;
            this.add.existing(balls[i]);
        }
        return balls;
    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 390,
    height: 800,
    backgroundColor: "#007700",
    zoom: 1,
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};



var game = new Phaser.Game(config);
