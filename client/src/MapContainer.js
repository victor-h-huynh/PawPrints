
import {GoogleApiWrapper} from 'google-maps-react';
export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
            <div style={style}>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: "AIzaSyCHvZtlI22uXF6WVlsl8XFfmIBM5xGttwA"
})(Container)