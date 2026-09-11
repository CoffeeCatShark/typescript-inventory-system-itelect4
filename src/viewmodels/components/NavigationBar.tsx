import { Link } from "react-router-dom";
import { useCurrentUser } from "@/data/store";

interface NavigationBarProps {
    accessCtrl: number;
}

export function NavigationBar({accessCtrl}:NavigationBarProps) {
    //CHANGE EVERYTHING
    switch(accessCtrl){
        case 0:{
            return (
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-4">
            <Link to="/items">Items</Link> |{" "}
            <Link to="/managers">Managers</Link> |{" "}
            <Link to="/suppliers">Suppliers</Link>
        </nav>
    );  // DEFAULT; OPERATOR LEVEL; DEMONSTRATION PAGE
        }

        case 1:{
            return (
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-4">
            <Link to="/items">Items</Link> |{" "}       
            <Link to="/managers">Managers</Link> |{" "}
            <Link to="/suppliers">Suppliers</Link>
        </nav>//CHANGE ITEMS TO STORAGE
    );} //FOR MANAGERS

        case 2:{return (
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-4">
            <Link to="/items">Items</Link> |{" "}
            <Link to="/suppliers">Suppliers</Link>
        </nav>
    );} //FOR SUPPLIERS

    }
}

export default NavigationBar;