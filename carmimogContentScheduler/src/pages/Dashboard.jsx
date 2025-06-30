import ToDoList from "../components/ToDoList";
import ContentCalendar from "../components/ContentCalendar";
import IdeasBoard from "../components/IdeasBoard";
import HashtagBoard from "../components/HashtagBoard";



const Dashboard = () =>{
    return (
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/*componentes*/}
            <ToDoList/>
            <ContentCalendar/>
            <IdeasBoard/>
            <HashtagBoard/>

         </div>
    );
};

export default Dashboard;