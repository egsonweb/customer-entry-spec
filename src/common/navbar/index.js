import NavbarTemplate from './navbar.html';
import './navbar.scss';

class NavBarController {
  $onInit() {
    this.brand = 'Customer Entry Spec';
  }
}

const Navbar = {
  template: NavbarTemplate,
  controller: NavBarController
};

export default Navbar;
