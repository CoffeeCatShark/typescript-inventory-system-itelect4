import { Link } from "react-router-dom";

interface NavigationBarProps {
    accessCtrl: number;
}

export function NavigationBar({accessCtrl}:NavigationBarProps) {
    
    switch(accessCtrl){
        case 0:{
            return (
        <nav>
            <Link to="/items">Items</Link> |{" "}
            <Link to="/managers">Managers</Link> |{" "}
            <Link to="/suppliers">Suppliers</Link>
        </nav>
    );  // DEFAULT; OPERATOR LEVEL; DEMONSTRATION PAGE
        }

        case 1:{
            return (
        <nav>
            <Link to="/items">Items</Link> |{" "}       
            <Link to="/managers">Managers</Link> |{" "}
            <Link to="/suppliers">Suppliers</Link>
        </nav>//CHANGE ITEMS TO STORAGE
    );} //FOR MANAGERS

        case 2:{return (
        <nav>
            <Link to="/items">Items</Link> |{" "}
            <Link to="/suppliers">Suppliers</Link>
        </nav>
    );} //FOR SUPPLIERS

    }
}

export default NavigationBar;