import React from 'react';
import {RouteHandler} from 'react-router';
import DocumentTitle from 'react-document-title';
import DocMeta from 'react-doc-meta';

export default class App extends React.Component {
  render () {
    var tags = [
      // default meta tags go here
    ];
    return <DocumentTitle title='Nicolas Bevacqua &mdash; JavaScript and Performance Consultant. Conference Speaker. Author. Blogger.'>
      <DocMeta tags={tags}>
        <RouteHandler />
      </DocMeta>
    </DocumentTitle>
  }
};
