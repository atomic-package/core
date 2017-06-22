/*
 * Author: Daisuke Takayama
 */

'use strict';
let e = eval, global: NodeJS.Global = e('this');

import Tab          = require('@atomic-package/tab');
import Toggle       = require('@atomic-package/toggle');
import ScrollSpy    = require('@atomic-package/scrollspy')
import Dropdown     = require('@atomic-package/dropdown')
import SideMenu     = require('@atomic-package/side-menu')
import ModalWindow  = require('@atomic-package/modal-window');
import SmoothScroll = require('@atomic-package/smooth-scroll');
import Switcher     = require('@atomic-package/switcher');

declare namespace NodeJS {
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    AP: AtomicPackage;
  }
}

export class AtomicPackage {
  private static _instance: AtomicPackage = null;

  public modal: ModalWindow;
  //public btn: any;
  public tab: Tab;
  public switcher: Switcher;
  public toggle: Toggle;
  public sideMenu: SideMenu;
  public scroll: SmoothScroll;
  public dropdown: Dropdown;
  public scrollSpy: ScrollSpy;

  constructor(
    option?: any
  ) {
    if (AtomicPackage._instance) {
      return AtomicPackage._instance;

    } else {
      this.modal     = new ModalWindow;
      //this.btn       = controller.btn;
      this.tab       = new Tab;
      this.switcher  = new Switcher;
      this.toggle    = new Toggle;
      this.sideMenu  = new SideMenu;
      this.scroll    = new SmoothScroll;
      this.dropdown  = new Dropdown;
      this.scrollSpy = new ScrollSpy;

      AtomicPackage._instance = this;
    }
  }
}


// npm & node
if (typeof module !== 'undefined') {
  module.exports = AtomicPackage;
}

// browser
if (typeof (global) !== 'undefined') {
  if (typeof global.AP === 'undefined') {
    Object.assign(global, { AP: new AtomicPackage });
  }
}
