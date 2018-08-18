import React from "react";
import classNames from "classnames";
import CastInfo from "../CastInfo/CastInfo";
import "./CastTile.css";

class CastTile extends React.Component {
  render() {
    const { member, hover, showInfo } = this.props;
    const { name } = member.authorData;
    const { imageUrl } = member;
    console.log(imageUrl);
    const role = member.postData ? member.postData.role : null;
    const tileStyle = {
      // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${image})`
      backgroundImage: `url(${imageUrl})`
    };
    if (imageUrl) {
      return (
        <div
          style={tileStyle}
          className={classNames("cast-tile", { "cast-tile-hover": hover })}
        >
          {name && showInfo && <CastInfo name={name} role={role} />}
          {/* <img src={image} className="background-img" /> */}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CastTile;
