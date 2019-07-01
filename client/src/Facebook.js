import React, { Component} from 'react';
import { FacebookProvider, ShareButton } from 'react-facebook';

export default class Facebook extends Component {
  render() {
    return (
      <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_API_KEY}>
        <ShareButton href="http://www.facebook.com">
          Share
        </ShareButton>
      </FacebookProvider>
    );
  }
}