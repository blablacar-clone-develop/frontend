import React from "react";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import SearchPanel from "../components/SearchPanel.tsx";

const SearchResult: React.FC = ()=>
{
 return (
     <main className="main">
        <Navbar/>
         <SearchPanel/>
         <Footer/>
     </main>
 );

};
export default SearchResult