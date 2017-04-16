import NavbarTemplate from './navbar.html';
import './navbar.scss';

class NavBarController {
  $onInit() {
    this.brand = 'CustomerSpec';
  }
}

const Navbar = {
  template: NavbarTemplate,
  controller: NavBarController
};

export default Navbar;
