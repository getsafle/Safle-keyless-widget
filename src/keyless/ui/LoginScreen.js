import UIScreen from './../classes/UIScreen.js';

import closeImg from './../images/close.png';
import logoImg from './../images/logo.png';
import userImg from './../images/user.png';
import lockBtn from './../images/lock.png';
import hiddenIcon from './../images/hidden.png';

class LoginScreen extends UIScreen {


  onInit(){
    this.safleField = this.el.querySelector('.input-id');
    this.saflePass = this.el.querySelector('.input-pass');
    this.error = this.el.querySelector('div.error_boundary');
  }

  onShow(){
    // on close
    this.el.querySelector('.close').addEventListener('click', () => {
      this.keyless._hideUI();
    });

    // on login
    this.el.querySelector('.signin-btn').addEventListener('click', ( e ) => {
      e.preventDefault();

      try {
        const resp = this.keyless.kctrl.login( this.safleField.value, this.saflePass.value );
        this.safleField.classList.remove('error');
      } catch( e ){
        console.log( 'An error has occured', e );
        // this.error.innerHTML = e.message;
        this.safleField.classList.add('error');
      }
    });
  }

  render(){
      return `<div class="login">

      <img class="close" src="${closeImg}" alt="Close Icon">

      <div class="login__header">

        <a class="logo" href="#">
          <img src="${logoImg}" alt="Safle Logo">
        </a>
        
        <h3>Connect via Safle</h3>

      </div>

      <form class="relative" onSubmit="">
        <div class="error">
          <div class="error_boundary"></div>
        </div>
        <div class="icon-inside">
          <img class="icon-left" src="${userImg}" alt="User Icon">
          <input class="input-id" type="text" placeholder="Safle ID/Email">
        </div>

        <div class="icon-inside">
          <img class="icon-left" src="${lockBtn}" alt="Lock Icon">
          <img class="icon-right" src="${hiddenIcon}" alt="Hidden Icon">
          <input class="input-pass" type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;">
        </div>
    
        <button class="btn__tp--1 signin-btn" type="submit">Sign In</button>

      </form>

      <div class="login__footer">

        <h4>Don't have an account? 
          <a href="#">Sign Up here </a>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
        </h4>
        
        <a class="forgot-pass" href="#">Forgot Password</a>

      </div>

    </div>`
  }

}

export default LoginScreen;