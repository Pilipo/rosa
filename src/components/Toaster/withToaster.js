import React from 'react';
import { Toast } from 'react-bootstrap';

import { withToast } from '../Toast';

const withToaster = (Component) => {
  class WithToaster extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        show: true,
        setShow: this.setShow,
        toast: null,
        toastCount: 0,
      };
      this.toastDelay = 2000;
      this.timeout = 200;
      this.toastTimer = null;
      this.setShow = this.setShow.bind(this);
      // console.log('withToaster props', this.props);
    }

    setShow(val) {
      // console.log("withToaster set show");
      this.setState({
        show: val,
      });
    }

    handleClose() {
      this.setShow(false);
    }

    handleShow() {
      this.setShow(true);
    }

    toastWatcher() {
      if (this.props.toast.toastStack.length > 0) {
        // console.log('we have DATA!!', this.props.toast.toastStack);
        const toast = this.props.toast.popToast();
        this.setState({
          toast,
          show: true,
        });
      }
      this.toastTimer = setTimeout(() => this.toastWatcher(), this.timeout);
    }

    componentDidMount() {
      // console.log('toaster mount', this.props);
      this.toastWatcher();
    }

    componentWillUnmount() {
      // console.log('toaster unmount');
      this.toastTimer = null;
    }

    render() {
      // console.log('called render');
      if (this.state.toast !== null) {
        const { message, header, type } = this.state.toast;
        const { show } = this.state;
        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);
        // console.log('toast found', this.state.toast);
        return (
          <>
            <div className="toast-container" tabIndex={-1}>
            <Toast className={`bg-${type}`} onClose={() => this.setShow(false)} show={show} delay={this.toastDelay} autohide>
              <Toast.Header>
                <strong className="mr-auto">{header}</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body className="text-center text-white">{message}</Toast.Body>
            </Toast>
            </div>
            </>
        );
      }
      return <></>;
    }
  }

  return withToast(WithToaster);
};

export default withToaster;
