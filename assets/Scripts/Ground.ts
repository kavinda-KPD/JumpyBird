import {
  _decorator,
  Canvas,
  Component,
  director,
  Node,
  UITransform,
  Vec3,
} from "cc";
import { GameCtrl } from "./GameCtrl";
const { ccclass, property } = _decorator;

@ccclass("NewComponent")
export class Ground extends Component {
  @property({
    type: Node,
    tooltip: "Ground 1 is here",
  })
  public ground1: Node;

  @property({
    type: Node,
    tooltip: "Ground 2 is here",
  })
  public ground2: Node;

  @property({
    type: Node,
    tooltip: "Ground 3 is here",
  })
  public ground3: Node;

  //create ground width variable
  public groundWidth1: number;
  public groundWidth2: number;
  public groundWidth3: number;

  public tempStartLocation1 = new Vec3();
  public tempStartLocation2 = new Vec3();
  public tempStartLocation3 = new Vec3();

  //create a variable for the speed of the game
  public gameControl: GameCtrl = new GameCtrl();
  public gameSpeed: number;

  protected onLoad(): void {
    this.startUp();
  }

  startUp() {
    this.groundWidth1 = this.ground1.getComponent(UITransform).width;
    this.groundWidth2 = this.ground2.getComponent(UITransform).width;
    this.groundWidth3 = this.ground3.getComponent(UITransform).width;

    this.tempStartLocation1.x = 0;
    this.tempStartLocation2.x = this.groundWidth1;
    this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }

  update(deltaTime: number) {
    this.gameSpeed = this.gameControl.speed;

    this.tempStartLocation1 = this.ground1.getPosition();
    this.tempStartLocation2 = this.ground2.getPosition();
    this.tempStartLocation3 = this.ground3.getPosition();

    //get the speed and subtract from x
    this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

    const scene = director.getScene();
    const canvas = scene.getComponentInChildren(Canvas);

    if (this.tempStartLocation1.x <= 0 - this.groundWidth1) {
      this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
    }
    if (this.tempStartLocation2.x <= 0 - this.groundWidth2) {
      this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
    }
    if (this.tempStartLocation3.x <= 0 - this.groundWidth3) {
      this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
    }

    //set the new position
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}
