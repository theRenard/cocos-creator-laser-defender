import { _decorator, Component, Node, tween } from "cc";
const { ccclass, property } = _decorator;
import { WaveConfig } from "./WaveConfig";

@ccclass("Enemy")
export class Enemy extends Component {
  waveConfig: WaveConfig = null;
  waypoints: Node[] = [];
  waypointIndex = 0;

  start() {
    this.waveConfig = this.node.parent.getComponent(WaveConfig);
    this.waypoints = this.waveConfig.getWaypoints();
    this.node.setPosition(this.waypoints[this.waypointIndex].position);
    this.followPath();
  }

  followPath() {
    const pathAnimation = tween(this.node);
    for (let i = 1; i < this.waypoints.length; i++) {
      pathAnimation.to(
        this.waveConfig.getDuration(),
        {
          position: this.waypoints[i].position,
        },
        {
          onComplete: () => {
            if (i === this.waypoints.length - 1) {
              this.node.destroy();
            }
          },
        }
      );
    }

    pathAnimation.start();
  }
}
