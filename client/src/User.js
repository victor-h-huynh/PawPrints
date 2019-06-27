import React, { Component } from 'react'
import './App.scss'
import { ProgressBar, Card } from 'react-bootstrap'


class User extends Component {

  render() {
    let badge1;
    let badge2;
    let badge3;
    let badge4;
    let badge5;

    let badgeStyle = {
      opacity: 0.5,
    };

    let currentBadgeStyle = {
      opacity: 1,
      width: "265px",
      height: "256px"
    }

    const levels = Math.floor(this.props.user.points/1000)
    const progress = (this.props.user.points - levels*1000)
    const missingPoints = Math.floor(1000 - progress)

      if (levels === 1) {
      badge1 = <img id="badge1" style={currentBadgeStyle} src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/8/85/SeasonalRank1-1.png/140px-SeasonalRank1-1.png?version=ce7c6eea36971495cdad1f06e7ef3709"  />;
    } else {
      badge1 = <img id="badge1" style={badgeStyle} src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/8/85/SeasonalRank1-1.png/140px-SeasonalRank1-1.png?version=ce7c6eea36971495cdad1f06e7ef3709" />;
    }
    if (levels === 2) {
      badge2 = <img id="badge2" style={currentBadgeStyle} src="https://media.esportsedition.com/wp-content/uploads/2019/01/legend.png" />
    } else {
      badge2 = <img id="badge2" style={badgeStyle} src="https://media.esportsedition.com/wp-content/uploads/2019/01/legend.png" />
    }
    if (levels === 3) {
      badge3 = <img id="badge3" style={currentBadgeStyle} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTm7OMsVnQuvqDvo-6p-HxzZ0i_dqtxxPfofU2WikW60LYIfPHg" />
    } else {
      badge3 = <img id="badge3" style={badgeStyle} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTm7OMsVnQuvqDvo-6p-HxzZ0i_dqtxxPfofU2WikW60LYIfPHg" />
    }
    if (levels === 4) {
      badge4 = <img id="badge4" style={currentBadgeStyle} src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/1/1c/SeasonalRank6-2.png/140px-SeasonalRank6-2.png?version=87515796db90be81886c62cad9faf87f" />
    } else {
      badge4 = <img id="badge4" style={badgeStyle} src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/1/1c/SeasonalRank6-2.png/140px-SeasonalRank6-2.png?version=87515796db90be81886c62cad9faf87f" />
    }
    if (levels >= 5) {
      badge5 = <img id="badge5" style={currentBadgeStyle} src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/d/df/SeasonalRankTop1.png/140px-SeasonalRankTop1.png?version=dccf8399e340ddf775a825e610cc5ad3" />
    } else {
      badge5 = <img id="badge5" style={badgeStyle} src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/d/df/SeasonalRankTop1.png/140px-SeasonalRankTop1.png?version=dccf8399e340ddf775a825e610cc5ad3" />
    }

    return(

      <React.Fragment>
        <div> 0 ------- Level {levels}! You need {missingPoints} points to reach level {levels + 1} ------- 1000

         {badge1}
         {badge2}
         {badge3}
         {badge4}
         {badge5}

        </div>
        <ProgressBar variant="success" animated now={progress/10} />

      <React.Fragment>
        <Card className="user">
        <Card.Header>{this.props.user.name}</Card.Header>
        </Card>
      </React.Fragment>
      </React.Fragment>



    )
  }
}

export default User;


// {levels  && <img scr="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/8/85/SeasonalRank1-1.png/140px-SeasonalRank1-1.png?version=ce7c6eea36971495cdad1f06e7ef3709" />}
