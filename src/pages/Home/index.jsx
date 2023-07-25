import SearchForm from "../../components/SearchForm";
import DrinksList from "../../components/DrinksList";
import DrinkDetailModal from "../../components/DrinkDetailModal";

export default function Home () {
    return (
        <div>
            <SearchForm/>

            <DrinksList/>
            
            <DrinkDetailModal/>
        </div>
    )
}