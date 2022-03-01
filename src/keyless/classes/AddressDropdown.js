
import networkImg from './../images/network-icon.svg';
import network2 from './../images/network-2.svg'
import network3 from './../images/network-3.svg'
import network4 from './../images/network-4.svg'
import network5 from './../images/network-5.svg'
import network6 from './../images/network-6.svg'

import { maxChars } from './../helpers/helpers';

let dropdownCounter = 0;

class AddressDropdown {
    initial = false
    opened = false;
    onChangeHandler = false;

    constructor( el, extra_class, extra_option_class, options, nativeToken='ETH' ){

        this.nativeToken = nativeToken;
        this.extraOptionClass = extra_option_class;        
        this.parentEl = el;
        this.extraClass = extra_class;
        this.options = options;

        this.index = ++dropdownCounter;
        this.opContClass = 'd_cont_'+this.index;

        this.el = document.createElement('div');
        this.el.innerHTML = this.render();
        this.parentEl.appendChild( this.el );

        setTimeout( () => this.onInit(), 200 );
    }
    onInit(){
        this.el.querySelector('.dropdown'+this.index ).addEventListener('click', ( e ) => {
            this.el.querySelector( '.'+this.opContClass ).classList.toggle('d--none');
            this.opened = true;
            setTimeout( () => this.handleOutClick(), 10 );
        }, false );

        Array.from( this.el.querySelectorAll('.dd_option') ).forEach( ( el ) => {
            el.addEventListener('click', ( e ) => {
                const idx = parseInt( e.currentTarget.getAttribute('data-option') );
                // console.log( idx );
                this.setOption( idx );
            }, false );
        })
    }

    setOptions( options ){
        this.options = options;
        this.el.querySelector( '.'+this.opContClass ).innerHTML = `
        ${ this.options.map( ( item, idx ) => {
            return `<div class="dd_option" data-option="${idx}">
                        <div>
                            <img src="${networkImg}" alt="Network Icon">
                            <h3 title="${item?.longLabel || ''}">${item.label}</h3>
                        </div>
                        <div>
                            <h3>${ maxChars( item.balance, 10 ) } <span class="c--dark">${ this.nativeToken }</span></h3>
                        </div>
                    </div>`
        }) }`;

        Array.from( this.el.querySelectorAll('.dd_option') ).forEach( ( el ) => {
            el.addEventListener('click', ( e ) => {
                const idx = parseInt( e.currentTarget.getAttribute('data-option') );
                // console.log( idx );
                this.setOption( idx );
            }, false );
        })
    }

    setOption( idx ){
        if( this.options[ idx ] ){
            this.activeOption = this.options[ idx ];
            //update icon
            // this.el.querySelector('.title_label .icon').setAttribute('src', this.activeOption.icon );
            this.opened = false;
            this.el.querySelector( '.'+this.opContClass ).classList.add('d--none');
            this.el.querySelector('.title_label h3').innerHTML = this.activeOption.label;
            this.el.querySelector('.balance h3').innerHTML = maxChars( this.activeOption.balance, 10 );
            this.triggerChange( idx, this.options[ idx ] );
        }
    }

    triggerChange( idx, option ){
        this.onChangeHandler != false && this.onChangeHandler.apply( this, [ idx, option ] );
    }

    onChange( fn ){
        this.onChangeHandler = fn;
    }

    handleOutClick(){
        const handler = ( e ) => {
            if( this.el.contains( e.target) ){
                window.removeEventListener('click', handler, false );
                console.log('prevented');
                return;
            }
            console.log('click outside');
            const opCont = this.el.querySelector( '.'+this.opContClass );
            if( !opCont.classList.contains('d--none') ){
                opCont.classList.add('d--none');
                this.opened = false;
            }
            window.removeEventListener('click', handler, false );
        };
        window.addEventListener('click', handler, false );
    }

    render(){
        return `<div class="${this.extraClass} dropdown${this.index}">
            <div class="title_label" style="justify-content: space-between;width: 100%;">
                <div>
                    <img class="title_icon" src="${networkImg}" alt="Network Icon">
                    <h3>${ this.initial? this.initial.label : this.options[0].label }</h3>
                </div>
                <div class="balance">
                    <h3>${ maxChars( this.initial? this.initial.balance : this.options[0].balance, 10 ) } <span class="c--dark">${ this.nativeToken }</span></h3>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                </div>
            </div>
            
        </div>
        <div class="dropdown__content ${this.extraOptionClass} ${this.opContClass} d--none">
        ${ this.options.map( ( item, idx ) => {
            return `<div class="dd_option" data-option="${idx}">
                        <div>
                            <img src="${networkImg}" alt="Network Icon">
                            <h3 title="${item?.longLabel || ''}">${item.label}</h3>
                        </div>
                        <div>
                            <h3>${ maxChars( item.balance, 10 ) } <span class="c--dark">${ this.nativeToken }</span></h3>
                        </div>
                    </div>`
        }) }        
        </div>`

    }
}

export default AddressDropdown;