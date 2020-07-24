class Toast {
  constructor() {
    this.toastStack = [];
  }

  // *** Toast API ***

  makeToast = (message, header = 'Rosa', type = 'success') => {
    this.toastStack.push({
      message,
      header,
      type,
      show: true,
    });
    // console.log('toast added to the stack', this.toastStack);
  };

  popToast = () => {
    const firstToast = this.toastStack.shift();
    // console.log('popping that toast', firstToast);
    return firstToast;
  }
}

export default Toast;
