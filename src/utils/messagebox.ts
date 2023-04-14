export default class MessageBox {
  mbArea: HTMLDivElement;

  constructor() {
    this.mbArea = document.querySelector('#msgbox-area') || document.createElement('div');

    if (!this.mbArea.id || this.mbArea.id == '') {
      this.mbArea.setAttribute('id', 'msgbox-area');
      this.mbArea.classList.add('msgbox-area');

      document.body.appendChild(this.mbArea);
    }
  }

  show(msOptions: MessageBoxOptions) {
    var msgTimeout: ReturnType<typeof setTimeout> | undefined;

    if (!msOptions.msg || ['', null].includes(msOptions.msg)) {
      // If the 'msg' parameter is not set, throw an error
      throw 'Message is empty or not defined.';
    }

    if (!msOptions.closeLabel || ['', null].includes(msOptions.closeLabel)) {
      // If close label not passed set it to 'Close'.
      msOptions.closeLabel = 'Close';
    }

    if (msOptions.closeTime && msOptions.closeTime > 0) {
      msgTimeout = setTimeout(() => {
        this.hide(container, msOptions.callback);
      }, msOptions.closeTime);
    }

    const container: HTMLDivElement = document.createElement('div');
    const content: HTMLDivElement = document.createElement('div');
    const commnad: HTMLDivElement = document.createElement('div');
    const close: HTMLSpanElement = document.createElement('span');

    // Container of the Message Box element
    container.classList.add('msgbox-box');
    container.appendChild(content);

    // Content area of the message box
    content.classList.add('msgbox-content');
    content.innerText = msOptions.msg;

    // Command box or the button container
    commnad.classList.add('msgbox-command');

    // Close button of the message box
    close.classList.add('msgbox-close');
    close.setAttribute('href', '#');
    close.innerText = msOptions.closeLabel;
    close.onclick = (event: MouseEvent) => {
      event.preventDefault();

      if (container.classList.contains('msgbox-box-hide')) {
        return;
      }

      clearTimeout(msgTimeout || undefined);

      msgTimeout = undefined;

      this.hide(container, msOptions.callback);
    };

    if (!msOptions.hideCloseLabel) {
      // If the hideCloseButton flag is false, or if it is undefined

      // Append the close button to the container
      commnad.appendChild(close);
      container.appendChild(commnad);
    }

    if (msOptions.status == 'error') {
      container.classList.add('error');
    } else if (msOptions.status == 'warning') {
      container.classList.add('warning');
    }
    this.mbArea.appendChild(container);
  }

  async hide(msgBoxContainer: HTMLDivElement, callback?: Function) {
    if (msgBoxContainer !== null) {
      // If the Message Box is not yet closed

      msgBoxContainer.classList.add('msgbox-box-hide');
    }

    await this.hideMessageBox(msgBoxContainer);

    this.mbArea.removeChild(msgBoxContainer);

    // clearTimeout(this.msgBox.timeout);

    if (typeof callback === 'function') {
      // If the callback parameter is a function

      callback();
    }
  }

  hideMessageBox(msgBoxContainer: HTMLDivElement) {
    return new Promise<void>((resolve) => {
      msgBoxContainer.ontransitionend = () => {
        resolve();
      };
    });
  }
}

export interface MessageBoxOptions {
  msg: string;
  callback?: Function;
  closeLabel?: string;
  closeTime?: number;
  hideCloseLabel?: boolean;
  status?: string;
}
