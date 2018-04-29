import React from "react";
import App from "../components/App";

export default function withApp(WrappedComponent) {
  return class WithApp extends React.Component {
    static async getInitialProps(ctx) {
      let wrappedProps = {};
      if (typeof WrappedComponent.getInitialProps === "function") {
        wrappedProps = await WrappedComponent.getInitialProps(ctx);
      }
      // Ensures material-ui renders the correct css prefixes server-side
      let userAgent;
      if (process.browser) {
        userAgent = navigator.userAgent;
      } else {
        userAgent = ctx.req.headers["user-agent"];
      }

      return { userAgent, wrappedProps };
    }

    render() {
      return (
        <App userAgent={this.props.userAgent}>
          <WrappedComponent {...this.props.wrappedProps} />
        </App>
      );
    }
  };
}
